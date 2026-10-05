const $=s=>document.querySelector(s);
const input=$("#videoFile"),video=$("#video"),canvas=$("#canvas"),ctx=canvas.getContext("2d");
let templateBytes=null,playerBytes=null,outputBlob=null,sourceURL=null;
const status=$("#status"),bar=$("#bar"),convert=$("#convert"),result=$("#result"),preview=$("#preview");

$("#quality").oninput=e=>$("#qualityValue").value=e.target.value+"%";

async function getBytes(url){let r=await fetch(url);if(!r.ok)throw Error(url+" 載入失敗");return new Uint8Array(await r.arrayBuffer())}
Promise.all([getBytes("templates/gb.melsave"),getBytes("templates/gb mp4.melsave")]).then(v=>{
 templateBytes=v[0];playerBytes=v[1];status.textContent="原版模板已載入，等待影片。";
 if(video.duration)convert.disabled=false;
}).catch(e=>status.textContent=e.message);

function r16(a,p){return a[p]|a[p+1]<<8} function r32(a,p){return (a[p]|a[p+1]<<8|a[p+2]<<16|a[p+3]<<24)>>>0}
async function unzip(bytes){
 let eocd=-1;for(let i=bytes.length-22;i>=0&&i>bytes.length-65558;i--)if(r32(bytes,i)===0x06054b50){eocd=i;break}
 if(eocd<0)throw Error("模板不是有效 ZIP");
 let count=r16(bytes,eocd+10),pos=r32(bytes,eocd+16),dec=new TextDecoder(),files=[];
 for(let k=0;k<count;k++){
  if(r32(bytes,pos)!==0x02014b50)throw Error("ZIP 目錄損壞");
  let method=r16(bytes,pos+10),cs=r32(bytes,pos+20),us=r32(bytes,pos+24),nl=r16(bytes,pos+28),el=r16(bytes,pos+30),cl=r16(bytes,pos+32),lo=r32(bytes,pos+42);
  let name=dec.decode(bytes.slice(pos+46,pos+46+nl)),ln=r16(bytes,lo+26),le=r16(bytes,lo+28),start=lo+30+ln+le,raw=bytes.slice(start,start+cs),data;
  if(method===0)data=raw;
  else if(method===8){let stream=new Blob([raw]).stream().pipeThrough(new DecompressionStream("deflate-raw"));data=new Uint8Array(await new Response(stream).arrayBuffer())}
  else throw Error("不支援 ZIP 壓縮方式 "+method);
  files.push({name,data});pos+=46+nl+el+cl;
 }
 return files;
}
function u16(a,n){a.push(n&255,n>>>8&255)}function u32(a,n){a.push(n&255,n>>>8&255,n>>>16&255,n>>>24&255)}
const table=(()=>{let t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc(a){let c=0xffffffff;for(let b of a)c=table[(c^b)&255]^(c>>>8);return(c^0xffffffff)>>>0}
function makeZip(files){let enc=new TextEncoder(),parts=[],cent=[],off=0;
 for(let f of files){let n=enc.encode(f.name),d=f.data,c=crc(d),h=[];u32(h,0x04034b50);u16(h,20);u16(h,0);u16(h,0);u16(h,0);u16(h,0);u32(h,c);u32(h,d.length);u32(h,d.length);u16(h,n.length);u16(h,0);let o=off,hh=new Uint8Array(h);parts.push(hh,n,d);off+=hh.length+n.length+d.length;
  let z=[];u32(z,0x02014b50);u16(z,20);u16(z,20);u16(z,0);u16(z,0);u16(z,0);u16(z,0);u32(z,c);u32(z,d.length);u32(z,d.length);u16(z,n.length);u16(z,0);u16(z,0);u16(z,0);u16(z,0);u32(z,0);u32(z,o);cent.push(new Uint8Array(z),n)}
 let co=off,cs=0;for(let c of cent){parts.push(c);cs+=c.length;off+=c.length}let e=[];u32(e,0x06054b50);u16(e,0);u16(e,0);u16(e,files.length);u16(e,files.length);u32(e,cs);u32(e,co);u16(e,0);parts.push(new Uint8Array(e));return new Blob(parts,{type:"application/octet-stream"})}
function seek(t){return new Promise((ok,no)=>{let f=()=>ok();video.addEventListener("seeked",f,{once:true});video.currentTime=Math.min(Math.max(0,t),Math.max(0,video.duration-.002));setTimeout(()=>no(Error("影片定位逾時")),10000)})}
function jpeg(q){return new Promise(ok=>canvas.toBlob(async b=>ok(new Uint8Array(await b.arrayBuffer())),"image/jpeg",q))}
function save(blob,name){let a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),3000)}

input.onchange=()=>{let f=input.files[0];if(!f)return;if(sourceURL)URL.revokeObjectURL(sourceURL);sourceURL=URL.createObjectURL(f);video.src=sourceURL;$("#fileTitle").textContent=f.name;$("#fileDesc").textContent=(f.size/1048576).toFixed(2)+" MB";result.hidden=true;video.onloadedmetadata=async()=>{status.textContent=`${video.duration.toFixed(2)} 秒・將平均擷取 168 幀`;convert.disabled=!templateBytes;try{await seek(0);ctx.drawImage(video,0,0,392,180);preview.src=canvas.toDataURL("image/jpeg",.72);preview.style.display="block"}catch{}}}

convert.onclick=async()=>{convert.disabled=true;result.hidden=true;bar.style.width="0";try{
 let originals=await unzip(templateBytes),keep=originals.filter(f=>!(/^\d+$/.test(f.name))&&f.name!=="Icon"),frames=[],q=+$("#quality").value/100;
 for(let i=0;i<168;i++){status.textContent=`擷取第 ${i+1} / 168 幀`;await seek(video.duration*i/168);let sw=video.videoWidth,sh=video.videoHeight,tr=392/180,sr=sw/sh,sx=0,sy=0,cw=sw,ch=sh;if(sr>tr){cw=sh*tr;sx=(sw-cw)/2}else{ch=sw/tr;sy=(sh-ch)/2}ctx.fillStyle="#000";ctx.fillRect(0,0,392,180);ctx.drawImage(video,sx,sy,cw,ch,0,0,392,180);frames.push(await jpeg(q));bar.style.width=((i+1)/168*94)+"%";if(i%5===0)await new Promise(r=>setTimeout(r,0))}
 let files=[...keep,{name:"Icon",data:frames[0]}];frames.forEach((d,i)=>files.push({name:String(i+1),data:d}));outputBlob=makeZip(files);bar.style.width="100%";status.textContent=`完成・${(outputBlob.size/1048576).toFixed(2)} MB`;result.hidden=false;
}catch(e){console.error(e);status.textContent="轉換失敗："+e.message}finally{convert.disabled=false}}
$("#downloadVideo").onclick=()=>outputBlob&&save(outputBlob,"gb.melsave");
$("#downloadPlayer").onclick=()=>playerBytes&&save(new Blob([playerBytes]),"gb mp4.melsave");
