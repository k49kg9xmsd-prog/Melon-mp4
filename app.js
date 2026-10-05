const $=s=>document.querySelector(s);
const input=$("#videoFile"),video=$("#video"),canvas=$("#canvas"),ctx=canvas.getContext("2d");
const status=$("#status"),bar=$("#bar"),convert=$("#convert"),result=$("#result"),preview=$("#preview");
let templateBytes=null,playerBytes=null,outputVideoBlob=null,outputPlayerBlob=null,sourceURL=null;

$("#quality").oninput=e=>$("#qualityValue").value=e.target.value+"%";

async function getBytes(url){
 const r=await fetch(url,{cache:"no-store"});
 if(!r.ok)throw Error(url+" 載入失敗");
 return await r.arrayBuffer();
}

Promise.all([
 getBytes("templates/gb.melsave"),
 getBytes("templates/gb mp4.melsave")
]).then(([a,b])=>{
 templateBytes=a; playerBytes=b;
 status.textContent="原版模板已載入，等待影片。";
 if(video.duration) convert.disabled=false;
}).catch(e=>status.textContent="模板載入失敗："+e.message);

function cleanName(){
 let n=$("#saveName").value.trim().replace(/[\\/:*?"<>|]/g,"_");
 if(!n)n="gb";
 return n;
}
function seek(t){
 return new Promise((ok,no)=>{
  let timer=setTimeout(()=>no(Error("影片定位逾時")),12000);
  const done=()=>{clearTimeout(timer);ok()};
  video.addEventListener("seeked",done,{once:true});
  video.currentTime=Math.min(Math.max(0,t),Math.max(0,video.duration-.002));
 });
}
function jpeg(q){
 return new Promise((ok,no)=>canvas.toBlob(async b=>{
  if(!b)return no(Error("JPEG 產生失敗"));
  ok(await b.arrayBuffer());
 },"image/jpeg",q));
}
function save(blob,name){
 const a=document.createElement("a");
 a.href=URL.createObjectURL(blob); a.download=name;
 document.body.appendChild(a); a.click(); a.remove();
 setTimeout(()=>URL.revokeObjectURL(a.href),3000);
}

input.onchange=()=>{
 const f=input.files[0]; if(!f)return;
 if(sourceURL)URL.revokeObjectURL(sourceURL);
 sourceURL=URL.createObjectURL(f); video.src=sourceURL;
 $("#fileTitle").textContent=f.name;
 $("#fileDesc").textContent=(f.size/1048576).toFixed(2)+" MB";
 result.hidden=true; convert.disabled=true;
 video.onloadedmetadata=async()=>{
  status.textContent=`${video.duration.toFixed(2)} 秒・平均擷取 168 張材質`;
  convert.disabled=!templateBytes;
  try{
   await seek(0);
   drawFrame();
   preview.src=canvas.toDataURL("image/jpeg",.72);
   preview.style.display="block";
  }catch{}
 };
};

function drawFrame(){
 const sw=video.videoWidth,sh=video.videoHeight,tr=392/180,sr=sw/sh;
 let sx=0,sy=0,cw=sw,ch=sh;
 if(sr>tr){cw=sh*tr;sx=(sw-cw)/2}
 else{ch=sw/tr;sy=(sh-ch)/2}
 ctx.fillStyle="#000";ctx.fillRect(0,0,392,180);
 ctx.drawImage(video,sx,sy,cw,ch,0,0,392,180);
}

async function makeVideoSave(frames,name){
 // Critical fix: use the original .melsave itself as the ZIP template and replace only assets 1..168.
 const zip=await JSZip.loadAsync(templateBytes);
 for(let i=0;i<168;i++) zip.file(String(i+1),frames[i]);

 // Keep the original Icon. Only change the display name where supported.
 const metaFile=zip.file("MetaData");
 if(metaFile){
  try{
   const meta=JSON.parse(await metaFile.async("string"));
   if(meta.metadata)meta.metadata.Name=name;
   zip.file("MetaData",JSON.stringify(meta));
  }catch{}
 }
 return zip.generateAsync({
  type:"blob",
  compression:"DEFLATE",
  compressionOptions:{level:6},
  platform:"DOS"
 });
}

async function makePlayerSave(name){
 const zip=await JSZip.loadAsync(playerBytes);
 const dataFile=zip.file("Data");
 if(!dataFile)throw Error("播放器缺少 Data");
 const data=JSON.parse(await dataFile.async("string"));
 let changed=0;

 function walk(v){
  if(Array.isArray(v)){v.forEach(walk);return}
  if(!v||typeof v!=="object")return;
  for(const k of Object.keys(v)){
   const x=v[k];
   if(typeof x==="string" && x.includes('spawn.createSave("gb",3,3)')){
    v[k]=x.replaceAll('spawn.createSave("gb",3,3)',`spawn.createSave(${JSON.stringify(name)},3,3)`);
    changed++;
   }else walk(x);
  }
 }
 walk(data);
 if(!changed)throw Error("找不到播放器 spawn.createSave(\"gb\")");

 zip.file("Data",JSON.stringify(data));
 const metaFile=zip.file("MetaData");
 if(metaFile){
  try{
   const meta=JSON.parse(await metaFile.async("string"));
   if(meta.metadata)meta.metadata.Name=name+" mp4";
   zip.file("MetaData",JSON.stringify(meta));
  }catch{}
 }
 return zip.generateAsync({
  type:"blob",
  compression:"DEFLATE",
  compressionOptions:{level:6},
  platform:"DOS"
 });
}

convert.onclick=async()=>{
 if(!templateBytes||!playerBytes||!video.duration)return;
 convert.disabled=true; result.hidden=true; bar.style.width="0";
 try{
  const q=+$("#quality").value/100,frames=[];
  // The original save uses assets 1..168. Preserve that exact mapping.
  for(let i=0;i<168;i++){
   status.textContent=`擷取 ${i+1} / 168`;
   await seek(video.duration*(i/168));
   drawFrame();
   frames.push(await jpeg(q));
   bar.style.width=((i+1)/168*88)+"%";
   if(i%4===0)await new Promise(r=>setTimeout(r,0));
  }
  const name=cleanName();
  status.textContent="依原版 .melsave 結構重新打包…";
  outputVideoBlob=await makeVideoSave(frames,name);
  bar.style.width="94%";
  outputPlayerBlob=await makePlayerSave(name);
  bar.style.width="100%";
  status.textContent=`完成：${name}.melsave + ${name} mp4.melsave`;
  result.hidden=false;
 }catch(e){
  console.error(e);
  status.textContent="轉換失敗："+e.message;
 }finally{convert.disabled=false}
};

$("#downloadVideo").onclick=()=>{
 const n=cleanName(); if(outputVideoBlob)save(outputVideoBlob,n+".melsave");
};
$("#downloadPlayer").onclick=()=>{
 const n=cleanName(); if(outputPlayerBlob)save(outputPlayerBlob,n+" mp4.melsave");
};
