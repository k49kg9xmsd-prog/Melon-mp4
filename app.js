const $=s=>document.querySelector(s);
const file=$("#file"),video=$("#video"),canvas=$("#canvas"),ctx=canvas.getContext("2d");
const preview=$("#preview"),convert=$("#convert"),status=$("#status"),bar=$("#bar"),downloads=$("#downloads");
let sourceURL,outputBlob,templateData,templateMeta,playerBytes;

const loadText=async p=>(await fetch(p)).text();
const b64bytes=s=>{s=s.trim();const b=atob(s),a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return a};
Promise.all([loadText("templates/Data.b64"),loadText("templates/MetaData.b64"),loadText("templates/player.b64")])
.then(([d,m,p])=>{templateData=b64bytes(d);templateMeta=b64bytes(m);playerBytes=b64bytes(p)})
.catch(()=>status.textContent="模板載入失敗，請透過 GitHub Pages / HTTP 開啟。");

$("#quality").oninput=e=>$("#qualityText").textContent=e.target.value+"%";
function u16(a,n){a.push(n&255,n>>>8&255)} function u32(a,n){a.push(n&255,n>>>8&255,n>>>16&255,n>>>24&255)}
const ct=(()=>{let t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc32(a){let c=0xffffffff;for(const b of a)c=ct[(c^b)&255]^(c>>>8);return(c^0xffffffff)>>>0}
function zipStore(files){const enc=new TextEncoder(),parts=[],central=[];let off=0;
 for(const f of files){const n=enc.encode(f.name),d=f.data,crc=crc32(d),h=[];u32(h,0x04034b50);u16(h,20);u16(h,0);u16(h,0);u16(h,0);u16(h,0);u32(h,crc);u32(h,d.length);u32(h,d.length);u16(h,n.length);u16(h,0);let o=off,hh=new Uint8Array(h);parts.push(hh,n,d);off+=hh.length+n.length+d.length;
 let c=[];u32(c,0x02014b50);u16(c,20);u16(c,20);u16(c,0);u16(c,0);u16(c,0);u16(c,0);u32(c,crc);u32(c,d.length);u32(c,d.length);u16(c,n.length);u16(c,0);u16(c,0);u16(c,0);u16(c,0);u32(c,0);u32(c,o);central.push(new Uint8Array(c),n)}
 let co=off,cs=0;for(const c of central){parts.push(c);cs+=c.length;off+=c.length}let e=[];u32(e,0x06054b50);u16(e,0);u16(e,0);u16(e,files.length);u16(e,files.length);u32(e,cs);u32(e,co);u16(e,0);parts.push(new Uint8Array(e));return new Blob(parts,{type:"application/octet-stream"})}
function seek(t){return new Promise((res,rej)=>{const f=()=>res();video.addEventListener("seeked",f,{once:true});video.currentTime=Math.min(Math.max(t,0),Math.max(0,video.duration-.001));setTimeout(()=>rej(Error("影片定位逾時")),10000)})}
function jpeg(q){return new Promise(r=>canvas.toBlob(async b=>r(new Uint8Array(await b.arrayBuffer())),"image/jpeg",q))}
function dl(blob,name){let a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),3000)}
file.onchange=()=>{const f=file.files[0];if(!f)return;if(sourceURL)URL.revokeObjectURL(sourceURL);sourceURL=URL.createObjectURL(f);video.src=sourceURL;$("#fileName").textContent=f.name;$("#fileInfo").textContent=(f.size/1048576).toFixed(2)+" MB";status.textContent="讀取影片中…";downloads.hidden=true;convert.disabled=true;
 video.onloadedmetadata=async()=>{status.textContent=`${video.duration.toFixed(2)} 秒・平均擷取 168 幀`;convert.disabled=false;try{await seek(0);ctx.drawImage(video,0,0,392,180);preview.src=canvas.toDataURL("image/jpeg",.72);preview.style.display="block"}catch{}}}
convert.onclick=async()=>{if(!templateData||!templateMeta)return alert("模板尚未載入");convert.disabled=true;bar.style.width="0";downloads.hidden=true;try{let frames=[],q=+$("#quality").value/100;
 for(let i=0;i<168;i++){status.textContent=`擷取 ${i+1} / 168`;await seek(video.duration*i/168);let sw=video.videoWidth,sh=video.videoHeight,tr=392/180,sr=sw/sh,sx=0,sy=0,cw=sw,ch=sh;if(sr>tr){cw=sh*tr;sx=(sw-cw)/2}else{ch=sw/tr;sy=(sh-ch)/2}ctx.fillStyle="#000";ctx.fillRect(0,0,392,180);ctx.drawImage(video,sx,sy,cw,ch,0,0,392,180);frames.push(await jpeg(q));bar.style.width=((i+1)/168*94)+"%";if(i%5===0)await new Promise(r=>setTimeout(r,0))}
 let fs=[{name:"MetaData",data:templateMeta},{name:"Data",data:templateData},{name:"Icon",data:frames[0]}];frames.forEach((d,i)=>fs.push({name:String(i+1),data:d}));outputBlob=zipStore(fs);bar.style.width="100%";status.textContent=`完成・${(outputBlob.size/1048576).toFixed(2)} MB`;downloads.hidden=false}catch(e){status.textContent="失敗："+e.message}finally{convert.disabled=false}}
$("#downloadVideo").onclick=()=>outputBlob&&dl(outputBlob,"gb.melsave");$("#downloadPlayer").onclick=()=>playerBytes&&dl(new Blob([playerBytes]),"gb mp4.melsave");
