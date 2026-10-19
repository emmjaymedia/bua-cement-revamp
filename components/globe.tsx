'use client';
import { useEffect, useRef } from 'react';
import geography from '../lib/world-geography.json';
const rad=Math.PI/180;
export default function Globe({stage,reduced}:{stage:number;reduced:boolean}){
 const canvasRef=useRef<HTMLCanvasElement>(null);const cameraRef=useRef({lon:-25,lat:18,scale:1});const stageRef=useRef(stage);const targetRef=useRef({lon:-25,lat:18,scale:1});
 useEffect(()=>{stageRef.current=stage;targetRef.current=stage===0?{lon:-25,lat:18,scale:1}:stage===1?{lon:17,lat:5,scale:1.75}:{lon:8,lat:9,scale:7.5};if(stage===0)Object.assign(cameraRef.current,targetRef.current)},[stage]);
 useEffect(()=>{
  const canvas=canvasRef.current;if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;
  let width=600,height=580,frame=0,visible=true,dragging=false,lastX=0,lastY=0;
  const camera=cameraRef.current;
  const resize=()=>{const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
  const ro=new ResizeObserver(resize);ro.observe(canvas);resize();
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting});observer.observe(canvas);
  const down=(e:PointerEvent)=>{dragging=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)};
  const move=(e:PointerEvent)=>{if(!dragging)return;targetRef.current.lon-=(e.clientX-lastX)*.28;targetRef.current.lat=Math.max(-60,Math.min(60,targetRef.current.lat+(e.clientY-lastY)*.2));lastX=e.clientX;lastY=e.clientY};
  const up=()=>{dragging=false};canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
  let lastTime=0;
  const draw=(time:number)=>{
   frame=requestAnimationFrame(draw);if(!visible||document.hidden||time-lastTime<30)return;lastTime=time;
   for(const key of ['lon','lat','scale'] as const)camera[key]+=(targetRef.current[key]-camera[key])*(reduced?1:.065);
   if(stageRef.current===2&&Math.abs(camera.scale-targetRef.current.scale)<.005)return;
   ctx.clearRect(0,0,width,height);const radius=Math.min(width*.405,height*.405)*camera.scale,cx=width/2,cy=height/2;
   const sinLat=Math.sin(camera.lat*rad),cosLat=Math.cos(camera.lat*rad);
   const project=(lon:number,lat:number)=>{const dl=(lon-camera.lon)*rad,la=lat*rad;return{x:cx+radius*Math.cos(la)*Math.sin(dl),y:cy-radius*(cosLat*Math.sin(la)-sinLat*Math.cos(la)*Math.cos(dl)),z:sinLat*Math.sin(la)+cosLat*Math.cos(la)*Math.cos(dl)}};
   if(camera.scale<3){const halo=ctx.createRadialGradient(cx,cy,radius*.92,cx,cy,radius*1.12);halo.addColorStop(0,'rgba(141,188,183,.08)');halo.addColorStop(.55,'rgba(141,188,183,.05)');halo.addColorStop(1,'rgba(141,188,183,0)');ctx.fillStyle=halo;ctx.beginPath();ctx.arc(cx,cy,radius*1.12,0,Math.PI*2);ctx.fill();}
   const ocean=ctx.createRadialGradient(cx-radius*.3,cy-radius*.4,0,cx,cy,radius);ocean.addColorStop(0,'#18383e');ocean.addColorStop(.8,'#102b33');ocean.addColorStop(1,'#071b25');ctx.fillStyle=ocean;ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.fill();
   ctx.save();ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.clip();
   // Geographic graticule, clipped to the visible hemisphere.
   ctx.strokeStyle='rgba(168,205,203,.10)';ctx.lineWidth=.6;
   const line=(points:number[][])=>{ctx.beginPath();let pen=false;for(const p of points){const q=project(p[0],p[1]);if(q.z>0){if(pen)ctx.lineTo(q.x,q.y);else ctx.moveTo(q.x,q.y);pen=true}else pen=false}ctx.stroke()};
   for(let lat=-60;lat<=60;lat+=30)line(Array.from({length:181},(_,i)=>[-180+i*2,lat]));
   for(let lon=-180;lon<180;lon+=30)line(Array.from({length:91},(_,i)=>[lon,-90+i*2]));
   // Natural Earth land points form a geographically accurate illuminated globe.
   for(const [lon,lat] of geography.points){const q=project(lon,lat);if(q.z<=0||q.x<0||q.y<0||q.x>width||q.y>height)continue;const africa=lon>-18&&lon<52&&lat<37&&lat>-35;ctx.fillStyle=africa&&stageRef.current>0?`rgba(227,200,141,${.25+q.z*.65})`:`rgba(151,190,181,${.15+q.z*.55})`;const size=Math.min(2.6,.7+q.z*.45+camera.scale*.16);ctx.beginPath();ctx.arc(q.x,q.y,size,0,Math.PI*2);ctx.fill()}
   ctx.strokeStyle='rgba(171,205,195,.35)';ctx.lineWidth=.7;for(const ring of geography.coasts)line(ring);
   if(stageRef.current>0){const p=project(8.1,9.1);if(p.z>0){ctx.strokeStyle='#e6c477';ctx.lineWidth=1;ctx.beginPath();ctx.arc(p.x,p.y,11,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#f3ddaa';ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fill();ctx.font='10px Arial';ctx.fillStyle='#eee5d0';ctx.fillText('NIGERIA',p.x+20,p.y+4)}}
   ctx.restore();ctx.strokeStyle='rgba(171,205,195,.22)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.stroke();
  };frame=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(frame);ro.disconnect();observer.disconnect();canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up)};
 },[reduced]);
 return <canvas ref={canvasRef} className="earth-canvas" aria-label={stage===0?'Interactive world globe. Drag to rotate. Use the Africa and Nigeria buttons to explore.':'Globe focused on Africa with Nigeria highlighted. Drag to rotate.'} role="img"/>;
}
