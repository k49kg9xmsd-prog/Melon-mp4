(() => {
  "use strict";

  const TEMPLATES = {
    "mc-48x27": {
      url: "./templates/mc-48x27.melsave",
      width: 48,
      height: 27
    },
    "pool-64x36": {
      url: "./templates/pool-64x36.melsave",
      width: 64,
      height: 36
    }
  };

  const $ = (id) => document.getElementById(id);
  const fileInput = $("videoFile");
  const video = $("video");
  const preview = $("preview");
  const work = $("work");
  const status = $("status");
  const convertButton = $("convert");

  let videoUrl = null;
  let duration = 0;
  let isConverting = false;

  function sleep(ms = 0) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function waitForEvent(element, eventName, timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
      let timer;

      const cleanup = () => {
        clearTimeout(timer);
        element.removeEventListener(eventName, onSuccess);
        element.removeEventListener("error", onError);
      };

      const onSuccess = () => {
        cleanup();
        resolve();
      };

      const onError = () => {
        cleanup();
        reject(new Error(mediaErrorMessage()));
      };

      element.addEventListener(eventName, onSuccess, { once: true });
      element.addEventListener("error", onError, { once: true });

      timer = setTimeout(() => {
        cleanup();
        reject(new Error(`等待 ${eventName} 逾時`));
      }, timeoutMs);
    });
  }

  function mediaErrorMessage() {
    const code = video.error?.code;
    const messages = {
      1: "影片載入被中止",
      2: "影片讀取失敗",
      3: "瀏覽器無法解碼這支影片",
      4: "瀏覽器不支援這個影片格式"
    };
    return messages[code] || "影片解析失敗";
  }

  function selectedTemplate() {
    return TEMPLATES[$("template").value];
  }

  function settings() {
    const template = selectedTemplate();
    const fps = Number($("fps").value);
    const maxSeconds = Math.max(1, Math.min(120, Number($("maxSeconds").value) || 15));
    const usedSeconds = Math.min(duration || 0, maxSeconds);
    const frameCount = Math.max(1, Math.floor(usedSeconds * fps));

    return {
      ...template,
      fps,
      maxSeconds,
      usedSeconds,
      frameCount,
      pixelCount: template.width * template.height,
      fit: $("fit").value
    };
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remain = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remain}`;
  }

  function updateStats() {
    const s = settings();
    $("durationStat").textContent = duration ? duration.toFixed(2) : "—";
    $("framesStat").textContent = duration ? s.frameCount.toLocaleString() : "—";
    $("pixelsStat").textContent = s.pixelCount.toLocaleString();
    $("charsStat").textContent = duration
      ? (s.frameCount * s.pixelCount).toLocaleString()
      : "—";

    $("previewTime").max = String(duration || 1);
    $("timeText").textContent =
      `${formatTime(Number($("previewTime").value))} / ${formatTime(duration)}`;
  }

  function drawVideoFrame(context, width, height, fitMode) {
    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);

    const sourceWidth = video.videoWidth;
    const sourceHeight = video.videoHeight;
    if (!sourceWidth || !sourceHeight) return;

    if (fitMode === "stretch") {
      context.drawImage(video, 0, 0, width, height);
      return;
    }

    const scale = fitMode === "cover"
      ? Math.max(width / sourceWidth, height / sourceHeight)
      : Math.min(width / sourceWidth, height / sourceHeight);

    const drawWidth = sourceWidth * scale;
    const drawHeight = sourceHeight * scale;

    context.drawImage(
      video,
      (width - drawWidth) / 2,
      (height - drawHeight) / 2,
      drawWidth,
      drawHeight
    );
  }

  function renderPreview() {
    if (!duration || video.readyState < 2) return;
    const context = preview.getContext("2d");
    drawVideoFrame(context, preview.width, preview.height, $("fit").value);
    $("previewEmpty").hidden = true;
  }

  async function seekTo(seconds) {
    const target = Math.min(
      Math.max(0, seconds),
      Math.max(0, video.duration - 0.001)
    );

    if (Math.abs(video.currentTime - target) < 0.0005 && video.readyState >= 2) {
      return;
    }

    const seeked = waitForEvent(video, "seeked", 15000);
    video.currentTime = target;
    await seeked;

    if ("requestVideoFrameCallback" in video) {
      await new Promise((resolve) => video.requestVideoFrameCallback(() => resolve()));
    } else {
      await sleep(30);
    }
  }

  async function loadVideo(file) {
    if (videoUrl) URL.revokeObjectURL(videoUrl);

    duration = 0;
    convertButton.disabled = true;
    $("previewTime").disabled = true;
    $("previewEmpty").hidden = false;
    status.className = "";
    status.textContent = "正在讀取影片資訊…";

    videoUrl = URL.createObjectURL(file);
    video.src = videoUrl;
    video.load();

    if (video.readyState < 1) {
      await waitForEvent(video, "loadedmetadata");
    }

    duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) {
      throw new Error("無法取得影片長度");
    }

    // Safari 有時需要短暫播放，才能解出第一張畫面。
    try {
      await video.play();
      await sleep(80);
      video.pause();
    } catch (_) {
      // 使用者已透過檔案選擇觸發操作，通常可播放；失敗時仍繼續嘗試 seek。
    }

    await seekTo(0);

    $("previewTime").disabled = false;
    $("previewTime").value = "0";
    $("saveName").value =
      `${file.name.replace(/\.[^.]+$/, "") || "video"} mp4`;

    updateStats();
    renderPreview();

    convertButton.disabled = false;
    status.textContent = "影片已載入，可以開始生成。";
  }

  function findLuaSlot(root) {
    let result = null;

    function walk(value) {
      if (result) return;

      if (Array.isArray(value)) {
        for (const item of value) walk(item);
        return;
      }

      if (!value || typeof value !== "object") return;

      for (const [key, child] of Object.entries(value)) {
        if (
          key === "stringValue" &&
          typeof child === "string" &&
          child.includes("function OnTick()") &&
          child.includes("outputs.array_vec.led")
        ) {
          result = { object: value, key, lua: child };
          return;
        }
        walk(child);
      }
    }

    walk(root);
    return result;
  }

  function extractPalette(lua) {
    const match = lua.match(/^w="([\s\S]*?)"\ns="/);
    if (!match) throw new Error("無法從模板 Lua 找到 4096 色調色盤");
    return match[1];
  }

  function quoteLuaString(text) {
    return `"${text
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\r/g, "\\r")
      .replace(/\n/g, "\\n")}"`;
  }

  function buildLua(palette, encodedFrames, pixelsPerFrame) {
    const lastPixelOffset = pixelsPerFrame - 1;

    return `w=${quoteLuaString(palette)}
s=${quoteLuaString(encodedFrames)}
i=string.len(s) / ${pixelsPerFrame}
f=1

function wio(fs)
 leds={}
 for e=1,${pixelsPerFrame} do
  rbg=string.find(w,string.sub(fs,e,e))-1
  r=rbg%16/15
  b=math.floor(rbg/16)%16/15
  g=math.floor(rbg/256)%16/15
  leds[e]={x=r,y=b,z=g,w=1}
 end
 return leds
end

function OnTick()
 outputs.array_vec.led=wio(string.sub(s,f,f+${lastPixelOffset}))
 f=f+${pixelsPerFrame}
 y=f/${pixelsPerFrame}
 outputs.string.i=tostring(math.floor(y)).."/"..tostring(i)
 if y>i then
  f=1
 end
end`;
  }

  function rgbToPaletteIndex(red, green, blue) {
    const r = Math.round((red / 255) * 15);
    const g = Math.round((green / 255) * 15);
    const b = Math.round((blue / 255) * 15);
    return r + b * 16 + g * 256;
  }

  function safeFileName(name) {
    return (name || "video mp4")
      .replace(/[\\/:*?"<>|]/g, "_")
      .trim() || "video mp4";
  }

  function randomUuid() {
    if (crypto.randomUUID) return crypto.randomUUID();

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === "x" ? random : (random & 3) | 8;
      return value.toString(16);
    });
  }

  async function fetchTemplate(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`模板下載失敗：HTTP ${response.status}`);
    }
    return response.arrayBuffer();
  }

  async function convertVideo() {
    if (isConverting) return;
    if (!fileInput.files?.[0]) throw new Error("請先選擇影片");
    if (typeof JSZip === "undefined") throw new Error("JSZip 未載入");

    isConverting = true;
    convertButton.disabled = true;
    status.className = "";
    $("bar").style.width = "0%";

    try {
      const s = settings();
      work.width = s.width;
      work.height = s.height;
      const context = work.getContext("2d", { willReadFrequently: true });

      status.textContent = "正在讀取存檔模板…";
      const templateBuffer = await fetchTemplate(s.url);
      const zip = await JSZip.loadAsync(templateBuffer);

      const dataFile = zip.file("Data");
      const metadataFile = zip.file("MetaData");
      if (!dataFile || !metadataFile) {
        throw new Error("模板缺少 Data 或 MetaData");
      }

      const dataObject = JSON.parse(await dataFile.async("string"));
      const luaSlot = findLuaSlot(dataObject);
      if (!luaSlot) throw new Error("模板中找不到 Lua 影片播放器");

      const paletteText = extractPalette(luaSlot.lua);
      const palette = [...paletteText];
      if (palette.length < 4096) {
        throw new Error(`調色盤只有 ${palette.length} 色，應為 4096 色`);
      }

      const frameChunks = new Array(s.frameCount);

      for (let frame = 0; frame < s.frameCount; frame++) {
        await seekTo(frame / s.fps);
        drawVideoFrame(context, s.width, s.height, s.fit);

        const rgba = context.getImageData(0, 0, s.width, s.height).data;
        const chars = new Array(s.pixelCount);

        for (let source = 0, pixel = 0; source < rgba.length; source += 4, pixel++) {
          chars[pixel] = palette[
            rgbToPaletteIndex(rgba[source], rgba[source + 1], rgba[source + 2])
          ];
        }

        frameChunks[frame] = chars.join("");

        if (frame % 2 === 0 || frame === s.frameCount - 1) {
          const percent = ((frame + 1) / s.frameCount) * 84;
          $("bar").style.width = `${percent.toFixed(1)}%`;
          status.textContent =
            `正在轉換影格 ${frame + 1} / ${s.frameCount}\n` +
            `時間 ${formatTime(frame / s.fps)} / ${formatTime(s.usedSeconds)}`;
          await sleep();
        }
      }

      const encodedVideo = frameChunks.join("");
      luaSlot.object[luaSlot.key] = buildLua(
        paletteText,
        encodedVideo,
        s.pixelCount
      );

      const metadata = JSON.parse(await metadataFile.async("string"));
      const saveName = safeFileName($("saveName").value);

      if ("UniqueId" in metadata) metadata.UniqueId = randomUuid();
      if ("category" in metadata) metadata.category = saveName;
      if ("CategoryValidated" in metadata) metadata.CategoryValidated = saveName;
      if ("mapName" in metadata) metadata.mapName = saveName;

      zip.file("Data", JSON.stringify(dataObject));
      zip.file("MetaData", JSON.stringify(metadata));

      $("bar").style.width = "87%";
      status.textContent = "正在壓縮並封裝 .melsave…";

      const blob = await zip.generateAsync(
        {
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level: 6 }
        },
        (progress) => {
          $("bar").style.width = `${87 + progress.percent * 0.13}%`;
        }
      );

      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `${saveName}.melsave`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      setTimeout(() => URL.revokeObjectURL(downloadUrl), 30000);

      $("bar").style.width = "100%";
      status.textContent =
        `完成：${saveName}.melsave\n` +
        `解析度 ${s.width}×${s.height}｜${s.frameCount} 幀｜` +
        `${encodedVideo.length.toLocaleString()} 個影片資料字元`;
    } finally {
      isConverting = false;
      convertButton.disabled = !duration;
    }
  }

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    try {
      await loadVideo(file);
    } catch (error) {
      console.error(error);
      status.className = "error";
      status.textContent = `影片載入失敗：${error.message || error}`;
      convertButton.disabled = true;
    }
  });

  $("previewTime").addEventListener("input", async (event) => {
    if (!duration || isConverting) return;

    try {
      const target = Number(event.target.value);
      await seekTo(target);
      renderPreview();
      updateStats();
    } catch (error) {
      console.error(error);
    }
  });

  $("template").addEventListener("change", () => {
    updateStats();
    renderPreview();
  });

  ["fps", "maxSeconds"].forEach((id) => {
    $(id).addEventListener("change", updateStats);
    $(id).addEventListener("input", updateStats);
  });

  $("fit").addEventListener("change", renderPreview);

  convertButton.addEventListener("click", async () => {
    try {
      await convertVideo();
    } catch (error) {
      console.error(error);
      status.className = "error";
      status.textContent = `生成失敗：${error.message || error}`;
      convertButton.disabled = !duration;
      isConverting = false;
    }
  });

  window.addEventListener("beforeunload", () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
  });

  updateStats();
})();
