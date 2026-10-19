'use client';
import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteHref, official } from '../lib/content';
const cards=[
 {title:'Strong Financials',image:'people',alt:'BUA Cement employees handling cement bags at the plant',description:'Performance you can follow. Progress you can measure.',action:'Explore financial reports',path:'/financialreport'},
 {title:'Our Leadership',image:'leadership',alt:'BUA Cement chairman Abdul Samad Rabiu seated in an office',description:'The people guiding our shared ambition.',action:'Meet our leadership',path:'/leadership'},
 {title:'Sustainability',image:'environment',alt:'BUA Cement team members working outdoors among green trees',description:'Building responsibly. Thinking beyond today.',action:'Discover our approach',path:'/sustainability'},
];
export default function WhoWeAre(){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  const el=root.current;if(!el)return;const items=Array.from(el.querySelectorAll<HTMLElement>('.who-stack-item'));let frame=0;
  const mq=window.matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>{frame=0;items.forEach((item,index)=>{const next=items[index+1];if(!next||mq.matches){item.style.setProperty('--stack-progress','0');return}const rect=item.getBoundingClientRect(),nextRect=next.getBoundingClientRect();const step=parseFloat(getComputedStyle(el).getPropertyValue('--who-step'))||76;const progress=Math.max(0,Math.min(1,(rect.height+24-(nextRect.top-rect.top))/(rect.height+24-step)));item.style.setProperty('--stack-progress',progress.toFixed(3))})};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);mq.addEventListener('change',schedule);schedule();
  return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);mq.removeEventListener('change',schedule);cancelAnimationFrame(frame)};
 },[]);
 return <section className="who-section" id="who-we-are" ref={root} aria-labelledby="who-heading"><div className="who-section-head"><span className="eyebrow light">Who we are</span><h2 id="who-heading">The strength<br/>behind our story.</h2><p>Our performance. Our people. Our purpose.<br/>Discover what makes us BUA Cement.</p></div><ol className="who-stack">{cards.map((card,index)=><li className="who-stack-item" key={card.title} style={{'--card-index':index} as React.CSSProperties}><a className="who-card" href={siteHref(card.path)} aria-label={card.title+' — '+card.action} onPointerMove={e=>{if(e.pointerType!=='mouse')return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mouse-x',((e.clientX-r.left)/r.width).toFixed(3));e.currentTarget.style.setProperty('--mouse-y',((e.clientY-r.top)/r.height).toFixed(3))}} onPointerLeave={e=>{e.currentTarget.style.setProperty('--mouse-x','.5');e.currentTarget.style.setProperty('--mouse-y','.5')}}><img className="who-image" src={'/images/'+card.image+'.webp'} alt={card.alt} loading="lazy"/><div className="who-shade"/><div className="who-pointer-light" aria-hidden="true"/><div className="who-card-header"><span className="who-number">0{index+1}</span><h3>{card.title}</h3><ArrowUpRight className="who-heading-arrow" size={23}/></div><div className="who-card-bottom"><p>{card.description}</p><span className="who-card-action">{card.action}<span><ArrowUpRight size={21}/></span></span></div></a></li>)}</ol><div className="who-section-end"><span>Rooted in strength. United in purpose.</span><a href={siteHref('/aboutus')}>More about BUA Cement <ArrowUpRight size={16}/></a></div></section>
}
