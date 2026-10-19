'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight, ArrowRight, MapPin, ChevronRight, Plus, Minus, Globe2, LocateFixed } from 'lucide-react';
import { siteHref, places, official } from '../lib/content';
const Globe=dynamic(()=>import('./globe'),{ssr:false,loading:()=> <div className="globe-loading"><Globe2 size={90} strokeWidth={.5}/><span>Loading the world…</span></div>});
const labels=['World','Africa','Nigeria'];
export default function Locations({map}:{map:string}){
 const [selected,setSelected]=useState(0),[stage,setStage]=useState(0),[playing,setPlaying]=useState(false),[zoom,setZoom]=useState(1),[pan,setPan]=useState({x:0,y:0}),[reduced,setReduced]=useState(false);
 const sectionRef=useRef<HTMLElement>(null),inView=useRef(false),timer=useRef<ReturnType<typeof setTimeout>|null>(null),drag=useRef<{x:number;y:number;px:number;py:number}|null>(null);
 const place=places[selected];
 useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);update();mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update)},[]);
 useEffect(()=>{
  const section=sectionRef.current;const scene=section?.querySelector('.planet-stage');if(!scene)return;
  const observer=new IntersectionObserver(([entry])=>{
   if(!entry.isIntersecting){
    inView.current=false;if(timer.current)clearTimeout(timer.current);setPlaying(false);setStage(0);setZoom(1);setPan({x:0,y:0});drag.current=null;
   }else if(entry.intersectionRatio>=.3&&!inView.current){
    inView.current=true;setStage(0);setZoom(1);setPan({x:0,y:0});
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setStage(2);setPlaying(false)}else setPlaying(true);
   }
  },{threshold:[0,.3]});
  observer.observe(scene);return()=>{observer.disconnect();if(timer.current)clearTimeout(timer.current)};
 },[]);
 useEffect(()=>{if(playing&&stage<2){timer.current=setTimeout(()=>setStage(s=>s+1),stage===0?600:900)}else if(stage===2)setPlaying(false);return()=>{if(timer.current)clearTimeout(timer.current)}},[playing,stage]);
 const stop=()=>{setPlaying(false);if(timer.current)clearTimeout(timer.current)};
 const go=(n:number)=>{stop();setStage(n);setZoom(1);setPan({x:0,y:0})};
 const select=(n:number)=>{stop();setStage(2);setSelected(n);if(stage!==2){setZoom(1);setPan({x:0,y:0})}};
 const adjust=(delta:number)=>{stop();if(stage<2){setStage(s=>Math.max(0,Math.min(2,s+(delta>0?1:-1))));return}setZoom(z=>{const next=Math.max(1,Math.min(2.5,z+delta));if(next===1)setPan({x:0,y:0});return next})};
 return <section className="locations section footprint-experience" id="locations" ref={sectionRef}>
 <div className="section-head"><div><span className="eyebrow light">Our footprint</span><h2>A world of possibility.<br/><span>A foundation in Nigeria.</span></h2></div><p>Start with the world. Discover Africa. Explore the Nigerian locations at the heart of BUA Cement.</p></div>
 <div className="explorer-shell"><div className="explorer-topbar"><div className="journey-steps" role="group" aria-label="Choose map view">{labels.map((label,i)=><button key={label} aria-pressed={stage===i} onClick={()=>go(i)} className={stage===i?'current':stage>i?'completed':''}><span>0{i+1}</span>{label}{i<2&&<ChevronRight size={13}/>}</button>)}</div><span className="journey-scroll-note">Scroll to discover</span></div>
 <div className="explorer-layout"><div className={'planet-stage stage-'+stage+(reduced?' reduce-motion':'')}>
 <div className="planet-stars" aria-hidden="true"/>
 <div className="stage-caption" aria-live="polite"><span className="eyebrow light">{stage===0?'The bigger picture':stage===1?'Our continent':'Our home'}</span><h3>{stage===0?'Connected to a world\nof possibility.':stage===1?'Africa.\nOur shared ambition.':'Nigeria.\nWhere strength begins.'}</h3></div>
 <div className="earth-layer"><Globe stage={stage} reduced={reduced}/></div>
 <div className="nigeria-layer" aria-hidden={stage!==2} inert={stage!==2}>
 <div className="nigeria-interaction" onPointerDown={e=>{if((e.target as Element).closest('button')||['NG-ED','NG-SO','NG-LA'].includes((e.target as Element).closest('path')?.id??''))return;stop();drag.current={x:e.clientX,y:e.clientY,px:pan.x,py:pan.y};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(!drag.current||zoom===1)return;const d=drag.current;const bound=120*(zoom-1);setPan({x:Math.max(-bound,Math.min(bound,d.px+e.clientX-d.x)),y:Math.max(-bound,Math.min(bound,d.py+e.clientY-d.y))})}} onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null}>
 <div className="nigeria-transform" style={{transform:`translate(${pan.x}px,${pan.y}px) scale(${zoom})`}}><div className="map-svg" aria-hidden="true" onClick={e=>{const state=(e.target as Element).closest('path')?.id;const index=['NG-ED','NG-SO','NG-LA'].indexOf(state??'');if(index>=0)select(index)}} dangerouslySetInnerHTML={{__html:map}}/><div className="map-markers">{places.map((p,i)=><button key={p.id} style={{left:(p.x/744*100)+'%',top:(p.y/600*100)+'%'}} className={'map-pin '+(selected===i?'selected':'')} onClick={()=>select(i)} aria-label={'Explore '+p.name} aria-pressed={selected===i}><span/><b>{p.name}</b></button>)}</div></div></div></div>
 <div className="planet-bottom"><div className="planet-hint"><span className="live-dot"/>{stage===2?(zoom>1?'Drag to pan · Select a location':'Select a location · Zoom to explore'):'Scroll into view · Explore automatically'}</div><div className="map-controls"><button onClick={()=>adjust(1/3)} aria-label="Zoom in" disabled={stage===2&&zoom>=2.5}><Plus size={17}/></button><button onClick={()=>adjust(-1/3)} aria-label="Zoom out" disabled={stage===0}><Minus size={17}/></button><button onClick={()=>go(2)} aria-label="Reset to Nigeria"><LocateFixed size={17}/></button></div></div>
 {stage<2&&<button className="skip-nigeria" onClick={()=>go(2)}>Explore Nigeria <ArrowRight size={15}/></button>}
 </div><aside className="explorer-sidebar" aria-label="BUA Cement locations"><div className="sidebar-heading"><span className="eyebrow light">Discover our locations</span><span className="location-count">03</span></div><div className="explorer-location-list" role="group" aria-label="Select location">{places.map((p,i)=><button key={p.id} aria-pressed={selected===i&&stage===2} onClick={()=>select(i)} className={selected===i?'selected':''}><span className="location-list-index">0{i+1}</span><div><strong>{p.name}</strong><small>{p.region} · {i===2?'Head office':'Manufacturing'}</small></div><ArrowUpRight size={17}/></button>)}</div><div className="explorer-detail" aria-live="polite"><img src={'/images/'+place.image+'.webp'} alt={place.name+' facility'} loading="lazy"/><div><span className="eyebrow light">{place.eyebrow}</span><h3>{place.name}</h3><p>{place.description}</p><a className="text-link" href={siteHref(place.path)}>Explore this location <ArrowUpRight size={16}/></a></div></div></aside></div>
 <div className="explorer-status"><span><Globe2 size={13}/> {labels[stage]} view</span><span>{stage===2?'Two manufacturing hubs. One shared purpose.':'A journey to the places we call home.'}</span><span className="view-status" aria-live="polite">{playing?'Discovering our footprint':stage===2?'Explore our footprint':'Ready to explore'}</span></div></div>
 <a className="locations-depot" href={siteHref('/distributors#location')}><MapPin size={20}/><span>Closer to your next project.</span> Find a depot <ArrowRight size={18}/></a></section>
}
