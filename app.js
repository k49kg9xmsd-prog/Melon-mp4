(() => {
  "use strict";

  const I18N = {
    "zh-Hant": {
      title: "甜瓜影片轉換器",
      languageLabel: "語言",
      intro: "選擇影片或 GIF，設定解析度與 FPS，完成後下載存檔。影片有多長就會完整轉換，所有處理都在目前裝置上進行。",
      mediaLabel: "影片或 GIF",
      templateLabel: "存檔模板／解析度",
      template48: "MC｜48 × 27（推薦）",
      template64: "Pool｜64 × 36（較清楚）",
      fpsLabel: "輸出 FPS",
      fitLabel: "畫面填充",
      fitContain: "完整顯示（可能有黑邊）",
      fitCover: "裁切填滿",
      fitStretch: "拉伸填滿",
      nameLabel: "存檔名稱",
      nameHelp: "最多 20 個字元。下載的是 ZIP，解壓縮後就是 .melsave。",
      previewEmpty: "請先選擇影片或 GIF",
      durationStat: "影片秒數",
      framesStat: "輸出影格",
      pixelsStat: "每幀像素",
      charsStat: "預估資料字元",
      convertButton: "生成存檔 ZIP",
      initialStatus: "請先選擇影片或 GIF。",
      usageTitle: "使用說明",
      usageText1: "建議先用 48×27、15 FPS 測試。64×36 畫面較清楚，但存檔更大，遊戲負擔也較高。影片越長，轉換時間與存檔容量也會增加。",
      usageText2: "完成後會下載一個 ZIP，裡面只有一個 .melsave。解壓縮後直接匯入遊戲。",
      creatorEyebrow: "原始存檔作者",
      creatorText: "原始 MP4 播放存檔由紫晶石灰製作。本網站僅修改存檔內容，讓玩家能替換成自己的影片或 GIF。",
      creatorLink: "前往紫晶石灰的哔哩哔哩個人空間",
      loadingMedia: "正在讀取影片資訊…",
      loadingGif: "正在讀取 GIF…",
      mediaReady: "影片已載入，可以開始生成。",
      gifReady: "GIF 已載入，共 {count} 幀。",
      loadingTemplate: "正在讀取存檔模板…",
      preparingDecode: "正在準備影片解碼…\n轉換期間請保持這個分頁開啟，長影片需要較多時間。",
      convertingVideo: "正在連續播放並擷取影格 {current} / {total}\n影片時間 {time} / {duration}",
      decodingGif: "正在解碼 GIF {current} / {total}",
      convertingGif: "正在轉換 GIF {current} / {total}",
      packing: "正在壓縮並封裝 .melsave…",
      creatingZip: "正在建立下載用 ZIP…",
      complete: "完成：{zip}\n解壓縮後：{melsave}\n解析度 {width}×{height}｜{frames} 幀｜{chars} 個影片資料字元",
      loadFailed: "影片載入失敗：{error}",
      generateFailed: "生成失敗：{error}",
      chooseMedia: "請先選擇影片或 GIF",
      invalidName: "存檔名稱必須是 1～{max} 個字元",
      noGifSupport: "這個瀏覽器不支援 GIF 逐幀解碼，請更新瀏覽器後再試",
      noDuration: "無法取得影片長度",
      templateFailed: "模板下載失敗：HTTP {status}",
      missingTemplate: "模板缺少 Data 或 MetaData",
      missingLua: "模板中找不到 Lua 影片播放器",
      missingPalette: "無法從模板 Lua 找到 4096 色調色盤",
      paletteShort: "調色盤只有 {count} 色，應為 4096 色",
      decodeTimeout: "影片解碼逾時，請保持分頁開啟後再試一次",
      decodeStartFailed: "瀏覽器無法開始解碼影片：{error}",
      noFrame: "沒有成功擷取任何影片畫面",
      iconFailed: "無法建立存檔圖示",
      jszipMissing: "JSZip 未載入"
    },
    "zh-Hans": {
      title: "甜瓜视频转换器",
      languageLabel: "语言",
      intro: "选择视频或 GIF，设置分辨率与 FPS，完成后下载存档。视频有多长就会完整转换，所有处理都在当前设备上进行。",
      mediaLabel: "视频或 GIF",
      templateLabel: "存档模板／分辨率",
      template48: "MC｜48 × 27（推荐）",
      template64: "Pool｜64 × 36（更清晰）",
      fpsLabel: "输出 FPS",
      fitLabel: "画面填充",
      fitContain: "完整显示（可能有黑边）",
      fitCover: "裁切填满",
      fitStretch: "拉伸填满",
      nameLabel: "存档名称",
      nameHelp: "最多 20 个字符。下载的是 ZIP，解压后就是 .melsave。",
      previewEmpty: "请先选择视频或 GIF",
      durationStat: "视频秒数",
      framesStat: "输出帧数",
      pixelsStat: "每帧像素",
      charsStat: "预计数据字符",
      convertButton: "生成存档 ZIP",
      initialStatus: "请先选择视频或 GIF。",
      usageTitle: "使用说明",
      usageText1: "建议先用 48×27、15 FPS 测试。64×36 画面更清晰，但存档更大，游戏负担也更高。视频越长，转换时间与存档容量也会增加。",
      usageText2: "完成后会下载一个 ZIP，里面只有一个 .melsave。解压后直接导入游戏。",
      creatorEyebrow: "原始存档作者",
      creatorText: "原始 MP4 播放存档由紫晶石灰制作。本网站仅修改存档内容，让玩家能替换成自己的视频或 GIF。",
      creatorLink: "前往紫晶石灰的哔哩哔哩个人空间",
      loadingMedia: "正在读取视频信息…",
      loadingGif: "正在读取 GIF…",
      mediaReady: "视频已载入，可以开始生成。",
      gifReady: "GIF 已载入，共 {count} 帧。",
      loadingTemplate: "正在读取存档模板…",
      preparingDecode: "正在准备视频解码…\n转换期间请保持此页面开启，长视频需要更多时间。",
      convertingVideo: "正在连续播放并提取帧 {current} / {total}\n视频时间 {time} / {duration}",
      decodingGif: "正在解码 GIF {current} / {total}",
      convertingGif: "正在转换 GIF {current} / {total}",
      packing: "正在压缩并封装 .melsave…",
      creatingZip: "正在创建下载 ZIP…",
      complete: "完成：{zip}\n解压后：{melsave}\n分辨率 {width}×{height}｜{frames} 帧｜{chars} 个视频数据字符",
      loadFailed: "视频载入失败：{error}",
      generateFailed: "生成失败：{error}",
      chooseMedia: "请先选择视频或 GIF",
      invalidName: "存档名称必须为 1～{max} 个字符",
      noGifSupport: "此浏览器不支持 GIF 逐帧解码，请更新浏览器后重试",
      noDuration: "无法获取视频时长",
      templateFailed: "模板下载失败：HTTP {status}",
      missingTemplate: "模板缺少 Data 或 MetaData",
      missingLua: "模板中找不到 Lua 视频播放器",
      missingPalette: "无法从模板 Lua 找到 4096 色调色板",
      paletteShort: "调色板只有 {count} 色，应为 4096 色",
      decodeTimeout: "视频解码超时，请保持页面开启后重试",
      decodeStartFailed: "浏览器无法开始解码视频：{error}",
      noFrame: "未能成功提取任何视频画面",
      iconFailed: "无法创建存档图标",
      jszipMissing: "JSZip 未载入"
    },
    "en": {
      title: "Melon Video Converter",
      languageLabel: "Language",
      intro: "Choose a video or GIF, set the resolution and FPS, then download the save file. The full media length is converted locally on your device.",
      mediaLabel: "Video or GIF",
      templateLabel: "Save template / Resolution",
      template48: "MC | 48 × 27 (Recommended)",
      template64: "Pool | 64 × 36 (Sharper)",
      fpsLabel: "Output FPS",
      fitLabel: "Frame fit",
      fitContain: "Fit entire frame (may add bars)",
      fitCover: "Crop to fill",
      fitStretch: "Stretch to fill",
      nameLabel: "Save name",
      nameHelp: "Maximum 20 characters. The download is a ZIP containing the .melsave file.",
      previewEmpty: "Choose a video or GIF",
      durationStat: "Duration",
      framesStat: "Output frames",
      pixelsStat: "Pixels per frame",
      charsStat: "Estimated data characters",
      convertButton: "Generate save ZIP",
      initialStatus: "Choose a video or GIF.",
      usageTitle: "How to use",
      usageText1: "Start with 48×27 at 15 FPS. 64×36 is sharper, but creates a larger save and requires more game performance. Longer media also takes more time and storage.",
      usageText2: "The download is a ZIP containing one .melsave file. Extract it, then import it into the game.",
      creatorEyebrow: "Original save creator",
      creatorText: "The original MP4 playback save was created by 紫晶石灰. This website only replaces the media data so players can use their own videos or GIFs.",
      creatorLink: "Visit 紫晶石灰 on Bilibili",
      loadingMedia: "Reading video information…",
      loadingGif: "Reading GIF…",
      mediaReady: "Video loaded. Ready to generate.",
      gifReady: "GIF loaded with {count} frames.",
      loadingTemplate: "Loading save template…",
      preparingDecode: "Preparing video decoding…\nKeep this tab open during conversion. Long videos take more time.",
      convertingVideo: "Capturing frame {current} / {total}\nVideo time {time} / {duration}",
      decodingGif: "Decoding GIF {current} / {total}",
      convertingGif: "Converting GIF {current} / {total}",
      packing: "Packing .melsave…",
      creatingZip: "Creating download ZIP…",
      complete: "Done: {zip}\nAfter extraction: {melsave}\nResolution {width}×{height} | {frames} frames | {chars} media data characters",
      loadFailed: "Media load failed: {error}",
      generateFailed: "Generation failed: {error}",
      chooseMedia: "Choose a video or GIF first",
      invalidName: "Save name must be 1–{max} characters",
      noGifSupport: "This browser does not support frame-by-frame GIF decoding. Update the browser and try again.",
      noDuration: "Could not read the video duration",
      templateFailed: "Template download failed: HTTP {status}",
      missingTemplate: "Template is missing Data or MetaData",
      missingLua: "Lua video player was not found in the template",
      missingPalette: "Could not find the 4096-color palette in the Lua template",
      paletteShort: "Palette has {count} colors; 4096 are required",
      decodeTimeout: "Video decoding timed out. Keep the tab open and try again.",
      decodeStartFailed: "The browser could not start video decoding: {error}",
      noFrame: "No video frames were captured",
      iconFailed: "Could not create the save icon",
      jszipMissing: "JSZip failed to load"
    }
  };

  let currentLanguage = localStorage.getItem("melon-language") || "zh-Hant";

  function t(key, variables = {}) {
    let text = I18N[currentLanguage]?.[key] ?? I18N["zh-Hant"][key] ?? key;
    for (const [name, value] of Object.entries(variables)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
    return text;
  }

  function applyLanguage(language) {
    currentLanguage = I18N[language] ? language : "zh-Hant";
    localStorage.setItem("melon-language", currentLanguage);
    document.documentElement.lang = currentLanguage === "en" ? "en" : currentLanguage;
    document.title = t("title");

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      element.innerHTML = t(element.dataset.i18nHtml);
    });

    $("language").value = currentLanguage;
  }


  const MAX_SAVE_NAME_LENGTH = 20;

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
  let selectedFile = null;
  let mediaKind = "video";
  let gifDecoder = null;
  let gifFrameCount = 0;
  let gifFirstFrame = null;

  function sleep(ms = 0) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

  function waitForEvent(element, eventName, timeoutMs = 20000) {
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

  function selectedTemplate() {
    return TEMPLATES[$("template").value];
  }

  function settings() {
    const template = selectedTemplate();
    const fps = Number($("fps").value);
    const usedSeconds = duration || 0;
    const frameCount = Math.max(1, Math.ceil(usedSeconds * fps));

    return {
      ...template,
      fps,
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


  function drawSourceFrame(context, source, sourceWidth, sourceHeight, width, height, fitMode) {
    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);

    if (!sourceWidth || !sourceHeight) return;

    if (fitMode === "stretch") {
      context.drawImage(source, 0, 0, width, height);
      return;
    }

    const scale = fitMode === "cover"
      ? Math.max(width / sourceWidth, height / sourceHeight)
      : Math.min(width / sourceWidth, height / sourceHeight);

    const drawWidth = sourceWidth * scale;
    const drawHeight = sourceHeight * scale;

    context.drawImage(
      source,
      (width - drawWidth) / 2,
      (height - drawHeight) / 2,
      drawWidth,
      drawHeight
    );
  }

  function drawVideoFrame(context, width, height, fitMode) {
    drawSourceFrame(
      context,
      video,
      video.videoWidth,
      video.videoHeight,
      width,
      height,
      fitMode
    );
  }

  function renderPreview() {
    if (!duration) return;
    const context = preview.getContext("2d");

    if (mediaKind === "gif") {
      if (!gifFirstFrame) return;
      drawSourceFrame(
        context,
        gifFirstFrame,
        gifFirstFrame.displayWidth,
        gifFirstFrame.displayHeight,
        preview.width,
        preview.height,
        $("fit").value
      );
    } else {
      if (video.readyState < 2) return;
      drawVideoFrame(context, preview.width, preview.height, $("fit").value);
    }

    $("previewEmpty").hidden = true;
  }

  async function seekPreview(seconds) {
    const target = Math.min(
      Math.max(0, seconds),
      Math.max(0, video.duration - 0.001)
    );

    if (Math.abs(video.currentTime - target) < 0.02 && video.readyState >= 2) {
      renderPreview();
      return;
    }

    try {
      const promise = waitForEvent(video, "seeked", 8000);
      video.currentTime = target;
      await promise;
    } catch (_) {
      // 部分瀏覽器偶爾不觸發 seeked；預覽時改用短暫等待。
      video.currentTime = target;
      await sleep(300);
    }

    renderPreview();
  }


  async function loadGif(file) {
    if (!("ImageDecoder" in window)) {
      throw new Error(t("noGifSupport"));
    }

    if (gifFirstFrame) {
      gifFirstFrame.close();
      gifFirstFrame = null;
    }
    if (gifDecoder) {
      gifDecoder.close();
      gifDecoder = null;
    }

    status.className = "";
    status.textContent = t("loadingGif");
    convertButton.disabled = true;
    $("previewTime").disabled = true;
    $("previewEmpty").hidden = false;

    const bytes = await file.arrayBuffer();
    gifDecoder = new ImageDecoder({
      data: bytes,
      type: file.type || "image/gif"
    });

    await gifDecoder.tracks.ready;
    const track = gifDecoder.tracks.selectedTrack;
    gifFrameCount = track.frameCount;

    const first = await gifDecoder.decode({ frameIndex: 0 });
    gifFirstFrame = first.image;

    let totalMicroseconds = 0;
    for (let i = 0; i < gifFrameCount; i++) {
      const decoded = i === 0 ? first : await gifDecoder.decode({ frameIndex: i });
      totalMicroseconds += decoded.image.duration || 100000;
      if (i !== 0) decoded.image.close();
    }

    duration = Math.max(0.1, totalMicroseconds / 1000000);
    $("previewTime").value = "0";
    $("previewTime").disabled = true;
    $("saveName").value = limitText(
      `${file.name.replace(/\.[^.]+$/, "") || "gif"} gif`,
      MAX_SAVE_NAME_LENGTH
    );

    updateNameState();
    updateStats();
    renderPreview();

    convertButton.disabled = false;
    status.textContent = t("gifReady", { count: gifFrameCount });
  }

  async function loadVideo(file) {
    if (videoUrl) URL.revokeObjectURL(videoUrl);

    duration = 0;
    convertButton.disabled = true;
    $("previewTime").disabled = true;
    $("previewEmpty").hidden = false;
    status.className = "";
    status.textContent = t("loadingMedia");

    videoUrl = URL.createObjectURL(file);
    video.src = videoUrl;
    video.load();

    if (video.readyState < 1) {
      await waitForEvent(video, "loadedmetadata");
    }

    duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) {
      throw new Error(t("noDuration"));
    }

    video.muted = true;
    video.playsInline = true;

    try {
      await video.play();
      await sleep(100);
      video.pause();
    } catch (_) {}

    await seekPreview(0);

    $("previewTime").disabled = false;
    $("previewTime").value = "0";
    $("saveName").value = limitText(
      `${file.name.replace(/\.[^.]+$/, "") || "video"} mp4`,
      MAX_SAVE_NAME_LENGTH
    );

    updateNameState();
    updateStats();
    renderPreview();

    convertButton.disabled = false;
    status.textContent = t("mediaReady");
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
    if (!match) throw new Error(t("missingPalette"));
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

    // Lua 端輸出為 {x=r, y=b, z=g}，LED 將 x/y/z 視為 R/G/B。
    // 因此來源綠色要放在中間 4 bits，來源藍色放在高 4 bits。
    return r + g * 16 + b * 256;
  }

  function encodeCurrentFrame(context, config, palette) {
    drawVideoFrame(context, config.width, config.height, config.fit);
    const rgba = context.getImageData(
      0, 0, config.width, config.height
    ).data;

    const chars = new Array(config.pixelCount);

    for (let source = 0, pixel = 0; source < rgba.length; source += 4, pixel++) {
      chars[pixel] = palette[
        rgbToPaletteIndex(rgba[source], rgba[source + 1], rgba[source + 2])
      ];
    }

    return chars.join("");
  }

  async function captureFramesContinuously(context, config, palette) {
    const frameChunks = new Array(config.frameCount);
    let captured = 0;
    let nextCaptureTime = 0;
    let lastMediaTime = -1;
    let rafId = null;
    let callbackId = null;
    let finished = false;

    const oldRate = video.playbackRate;
    video.playbackRate = 1;
    video.pause();

    // 只在開始時跳回一次，不再每一幀 seek。
    try {
      if (Math.abs(video.currentTime) > 0.05) {
        const seekPromise = waitForEvent(video, "seeked", 10000);
        video.currentTime = 0;
        await seekPromise;
      } else {
        video.currentTime = 0;
      }
    } catch (_) {
      video.currentTime = 0;
      await sleep(400);
    }

    function captureAt(mediaTime) {
      if (finished || captured >= config.frameCount) return;

      while (
        captured < config.frameCount &&
        mediaTime + 0.0005 >= nextCaptureTime
      ) {
        frameChunks[captured] = encodeCurrentFrame(context, config, palette);
        captured += 1;
        nextCaptureTime = captured / config.fps;

        const percent = (captured / config.frameCount) * 84;
        $("bar").style.width = `${percent.toFixed(1)}%`;
        status.textContent =
          `正在連續播放並擷取影格 ${captured} / ${config.frameCount}\n` +
          `影片時間 ${formatTime(mediaTime)} / ${formatTime(config.usedSeconds)}`;
      }
    }

    return new Promise(async (resolve, reject) => {
      let watchdog;

      const cleanup = () => {
        finished = true;
        clearTimeout(watchdog);
        if (rafId !== null) cancelAnimationFrame(rafId);
        if (
          callbackId !== null &&
          "cancelVideoFrameCallback" in video
        ) {
          video.cancelVideoFrameCallback(callbackId);
        }
        video.pause();
        video.playbackRate = oldRate;
      };

      const finish = () => {
        cleanup();

        // 某些低影格率影片可能沒有剛好走到最後採樣點；
        // 以最後一張可用畫面補齊剩餘輸出幀。
        if (captured === 0) {
          reject(new Error(t("noFrame")));
          return;
        }

        while (captured < config.frameCount) {
          frameChunks[captured] = frameChunks[captured - 1];
          captured += 1;
        }

        resolve(frameChunks);
      };

      const fail = (error) => {
        cleanup();
        reject(error);
      };

      watchdog = setTimeout(() => {
        fail(new Error(t("decodeTimeout")));
      }, Math.max(30000, config.usedSeconds * 5000));

      const onEnded = () => finish();
      video.addEventListener("ended", onEnded, { once: true });

      if ("requestVideoFrameCallback" in video) {
        const onFrame = (_now, metadata) => {
          if (finished) return;

          const mediaTime = Number.isFinite(metadata.mediaTime)
            ? metadata.mediaTime
            : video.currentTime;

          if (mediaTime >= lastMediaTime) {
            lastMediaTime = mediaTime;
            captureAt(mediaTime);
          }

          if (
            captured >= config.frameCount ||
            mediaTime >= config.usedSeconds
          ) {
            finish();
            return;
          }

          callbackId = video.requestVideoFrameCallback(onFrame);
        };

        callbackId = video.requestVideoFrameCallback(onFrame);
      } else {
        const onAnimationFrame = () => {
          if (finished) return;
          const mediaTime = video.currentTime;

          if (mediaTime > lastMediaTime + 0.001) {
            lastMediaTime = mediaTime;
            captureAt(mediaTime);
          }

          if (
            captured >= config.frameCount ||
            mediaTime >= config.usedSeconds ||
            video.ended
          ) {
            finish();
            return;
          }

          rafId = requestAnimationFrame(onAnimationFrame);
        };

        rafId = requestAnimationFrame(onAnimationFrame);
      }

      try {
        await video.play();
      } catch (error) {
        fail(new Error(t("decodeStartFailed", { error: error.message || error })));
      }
    });
  }


  async function captureGifFrames(context, config, palette) {
    const output = new Array(config.frameCount);
    const decodedFrames = [];
    const frameEnds = [];
    let elapsed = 0;

    for (let i = 0; i < gifFrameCount; i++) {
      const decoded = await gifDecoder.decode({ frameIndex: i });
      const frame = decoded.image;
      elapsed += (frame.duration || 100000) / 1000000;
      decodedFrames.push(frame);
      frameEnds.push(elapsed);

      if (i % 4 === 0) {
        status.textContent = t("decodingGif", {
          current: i + 1,
          total: gifFrameCount
        });
        await sleep();
      }
    }

    for (let outIndex = 0; outIndex < config.frameCount; outIndex++) {
      const time = outIndex / config.fps;
      let sourceIndex = frameEnds.findIndex((end) => time < end);
      if (sourceIndex < 0) sourceIndex = decodedFrames.length - 1;

      const frame = decodedFrames[sourceIndex];
      drawSourceFrame(
        context,
        frame,
        frame.displayWidth,
        frame.displayHeight,
        config.width,
        config.height,
        config.fit
      );

      const rgba = context.getImageData(
        0, 0, config.width, config.height
      ).data;
      const chars = new Array(config.pixelCount);

      for (let source = 0, pixel = 0; source < rgba.length; source += 4, pixel++) {
        chars[pixel] = palette[
          rgbToPaletteIndex(rgba[source], rgba[source + 1], rgba[source + 2])
        ];
      }

      output[outIndex] = chars.join("");
      $("bar").style.width = `${((outIndex + 1) / config.frameCount * 84).toFixed(1)}%`;
      status.textContent = t("convertingGif", {
        current: outIndex + 1,
        total: config.frameCount
      });

      if (outIndex % 3 === 0) await sleep();
    }

    decodedFrames.forEach((frame) => frame.close());
    return output;
  }

  async function canvasToPngBytes(canvas) {
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (result) => result ? resolve(result) : reject(new Error(t("iconFailed"))),
        "image/png"
      );
    });
    return new Uint8Array(await blob.arrayBuffer());
  }

  async function createIconBytes(config) {
    const iconCanvas = document.createElement("canvas");
    iconCanvas.width = 64;
    iconCanvas.height = 64;
    const iconContext = iconCanvas.getContext("2d");

    if (mediaKind === "gif") {
      drawSourceFrame(
        iconContext,
        gifFirstFrame,
        gifFirstFrame.displayWidth,
        gifFirstFrame.displayHeight,
        64,
        64,
        "cover"
      );
    } else {
      video.pause();
      await seekPreview(0);
      drawSourceFrame(
        iconContext,
        video,
        video.videoWidth,
        video.videoHeight,
        64,
        64,
        "cover"
      );
    }

    return canvasToPngBytes(iconCanvas);
  }

  function textLength(text) {
    return [...text].length;
  }

  function limitText(text, maximum) {
    return [...text].slice(0, maximum).join("");
  }

  function safeFileName(name) {
    const cleaned = (name || "video mp4")
      .replace(/[\\/:*?"<>|]/g, "_")
      .trim();

    return limitText(cleaned || "video mp4", MAX_SAVE_NAME_LENGTH);
  }

  function updateNameState() {
    const input = $("saveName");
    const length = textLength(input.value);
    const valid = length > 0 && length <= MAX_SAVE_NAME_LENGTH;

    $("nameCount").textContent = `${length} / ${MAX_SAVE_NAME_LENGTH}`;
    $("nameCount").classList.toggle("warning", !valid);
    input.classList.toggle("invalid", !valid);

    if (!isConverting) {
      convertButton.disabled = !duration || !valid;
    }

    return valid;
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
      throw new Error(t("templateFailed", { status: response.status }));
    }
    return response.arrayBuffer();
  }

  async function convertVideo() {
    if (isConverting) return;
    if (!fileInput.files?.[0]) throw new Error(t("chooseMedia"));
    if (!updateNameState()) {
      throw new Error(t("invalidName", { max: MAX_SAVE_NAME_LENGTH }));
    }
    if (typeof JSZip === "undefined") throw new Error(t("jszipMissing"));

    isConverting = true;
    convertButton.disabled = true;
    $("previewTime").disabled = true;
    status.className = "";
    $("bar").style.width = "0%";

    try {
      const config = settings();
      work.width = config.width;
      work.height = config.height;
      const context = work.getContext("2d", { willReadFrequently: true });

      status.textContent = t("loadingTemplate");
      const templateBuffer = await fetchTemplate(config.url);
      const zip = await JSZip.loadAsync(templateBuffer);

      const dataFile = zip.file("Data");
      const metadataFile = zip.file("MetaData");
      if (!dataFile || !metadataFile) {
        throw new Error(t("missingTemplate"));
      }

      const dataObject = JSON.parse(await dataFile.async("string"));
      const luaSlot = findLuaSlot(dataObject);
      if (!luaSlot) throw new Error(t("missingLua"));

      const paletteText = extractPalette(luaSlot.lua);
      const palette = [...paletteText];

      if (palette.length < 4096) {
        throw new Error(t("paletteShort", { count: palette.length }));
      }

      status.textContent = t("preparingDecode");

      const iconBytes = await createIconBytes(config);

      const frameChunks = mediaKind === "gif"
        ? await captureGifFrames(context, config, palette)
        : await captureFramesContinuously(context, config, palette);

      const encodedVideo = frameChunks.join("");
      luaSlot.object[luaSlot.key] = buildLua(
        paletteText,
        encodedVideo,
        config.pixelCount
      );

      const metadata = JSON.parse(await metadataFile.async("string"));
      const saveName = safeFileName($("saveName").value);

      if ("UniqueId" in metadata) metadata.UniqueId = randomUuid();
      if ("category" in metadata) metadata.category = saveName;
      if ("CategoryValidated" in metadata) metadata.CategoryValidated = saveName;
      if ("mapName" in metadata) metadata.mapName = saveName;

      zip.file("Data", JSON.stringify(dataObject));
      zip.file("MetaData", JSON.stringify(metadata));
      zip.file("Icon", iconBytes);

      $("bar").style.width = "87%";
      status.textContent = t("packing");

      // 先建立真正的 .melsave（其內部格式本身就是 ZIP）。
      const melsaveBytes = await zip.generateAsync(
        {
          type: "uint8array",
          compression: "DEFLATE",
          compressionOptions: { level: 6 }
        },
        (progress) => {
          $("bar").style.width = `${87 + progress.percent * 0.08}%`;
        }
      );

      // 再包一層一般 ZIP。使用者下載後只要解壓縮，
      // 裡面就是副檔名正確的 .melsave。
      status.textContent = t("creatingZip");

      const downloadZip = new JSZip();
      downloadZip.file(`${saveName}.melsave`, melsaveBytes, {
        binary: true,
        compression: "STORE"
      });

      const downloadBlob = await downloadZip.generateAsync(
        {
          type: "blob",
          mimeType: "application/zip",
          compression: "DEFLATE",
          compressionOptions: { level: 1 }
        },
        (progress) => {
          $("bar").style.width = `${95 + progress.percent * 0.05}%`;
        }
      );

      const downloadUrl = URL.createObjectURL(downloadBlob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `${saveName}.zip`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      setTimeout(() => URL.revokeObjectURL(downloadUrl), 30000);

      $("bar").style.width = "100%";
      status.textContent =
        `完成：${saveName}.zip\n` +
        `解壓縮後：${saveName}.melsave\n` +
        `解析度 ${config.width}×${config.height}｜${config.frameCount} 幀｜` +
        `${encodedVideo.length.toLocaleString()} 個影片資料字元`;
    } finally {
      isConverting = false;
      convertButton.disabled = !duration || !updateNameState();
      $("previewTime").disabled = !duration;
    }
  }

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    selectedFile = file;
    mediaKind = (
      file.type === "image/gif" ||
      file.name.toLowerCase().endsWith(".gif")
    ) ? "gif" : "video";

    try {
      if (mediaKind === "gif") {
        await loadGif(file);
      } else {
        await loadVideo(file);
      }
    } catch (error) {
      console.error(error);
      status.className = "error";
      status.textContent = t("loadFailed", { error: error.message || error });
      convertButton.disabled = true;
    }
  });

  $("previewTime").addEventListener("change", async (event) => {
    if (!duration || isConverting || mediaKind === "gif") return;

    try {
      const target = Number(event.target.value);
      await seekPreview(target);
      updateStats();
    } catch (error) {
      console.error(error);
    }
  });

  $("previewTime").addEventListener("input", (event) => {
    $("timeText").textContent =
      `${formatTime(Number(event.target.value))} / ${formatTime(duration)}`;
  });

  $("template").addEventListener("change", () => {
    updateStats();
    renderPreview();
  });

  $("fps").addEventListener("change", updateStats);
  $("fps").addEventListener("input", updateStats);

  $("fit").addEventListener("change", renderPreview);

  convertButton.addEventListener("click", async () => {
    try {
      await convertVideo();
    } catch (error) {
      console.error(error);
      status.className = "error";
      status.textContent = t("generateFailed", { error: error.message || error });
      convertButton.disabled = !duration || !updateNameState();
      $("previewTime").disabled = !duration;
      isConverting = false;
    }
  });

  $("language").addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });

  $("saveName").addEventListener("input", () => {
    const input = $("saveName");

    if (textLength(input.value) > MAX_SAVE_NAME_LENGTH) {
      input.value = limitText(input.value, MAX_SAVE_NAME_LENGTH);
    }

    updateNameState();
  });

  window.addEventListener("beforeunload", () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (gifFirstFrame) gifFirstFrame.close();
    if (gifDecoder) gifDecoder.close();
  });

  applyLanguage(currentLanguage);
  updateNameState();
  updateStats();
})();
