'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, RefreshCw, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { isMarketQuote, type MarketQuote } from '../lib/market-quote';
const sourceUrl='https://ngxgroup.com/exchange/data/company-profile/?directory=companydirectory&symbol=BUACEMENT';
const Context=createContext<{quote:MarketQuote|null;loading:boolean;error:boolean;refresh:()=>void}>({quote:null,loading:true,error:false,refresh:()=>{}});
export function MarketQuoteProvider({children}:{children:React.ReactNode}){
 const [quote,setQuote]=useState<MarketQuote|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState(false);const controller=useRef<AbortController|null>(null);
 const refresh=useCallback(async()=>{
  if(document.hidden)return;controller.current?.abort();const request=new AbortController();controller.current=request;setLoading(true);
  try{const r=await fetch('/api/market-quote',{signal:request.signal});if(!r.ok)throw new Error();const q=await r.json();if(!isMarketQuote(q))throw new Error();setQuote(q);setError(false)}catch(e){if((e as Error).name!=='AbortError')setError(true)}finally{if(!request.signal.aborted)setLoading(false)}
 },[]);
 useEffect(()=>{refresh();const timer=setInterval(refresh,300000);const onVisible=()=>{if(!document.hidden)refresh()};document.addEventListener('visibilitychange',onVisible);return()=>{clearInterval(timer);controller.current?.abort();document.removeEventListener('visibilitychange',onVisible)}},[refresh]);
 return <Context.Provider value={{quote,loading,error,refresh}}>{children}</Context.Provider>;
}
export default function MarketQuote({compact=false}:{compact?:boolean}){
 const {quote,loading,error,refresh}=useContext(Context);
 const date=quote?new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:compact?undefined:'numeric',timeZone:'Africa/Lagos'}).format(new Date(quote.tradeDate+'T12:00:00+01:00')):null;
 const value=quote?new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',minimumFractionDigits:2,maximumFractionDigits:2}).format(quote.price):loading?'—':'Unavailable';
 const direction=quote?.changePercent===null?'neutral':(quote?.changePercent??0)>0?'up':(quote?.changePercent??0)<0?'down':'neutral';
 const change=quote?.changePercent===null||!quote?'—':`${quote.changePercent>0?'+':''}${quote.changePercent.toFixed(2)}%`;
 if(compact)return <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="market-compact" title="Latest available NGX end-of-day quote. Open Nigerian Exchange details in a new tab."><span className="market-symbol"><i/> NGX · BUACEMENT</span><span className="market-compact-value">{value}<small className={'quote-'+direction}>{quote?change:''}</small></span><span className="market-compact-date">{quote?`EOD · ${date}${error?' · Refresh unavailable':''}`:loading?'Fetching market quote…':'Quote unavailable'}</span></a>;
 return <div className="market-summary" id="share-price"><div className="market-summary-label"><span className="eyebrow">On the Nigerian Exchange</span><h3>BUACEMENT</h3><span>Latest available end-of-day quote</span></div><div className="market-summary-value"><strong>{value}</strong><span className={'market-movement quote-'+direction}>{direction==='up'?<TrendingUp size={17}/>:direction==='down'?<TrendingDown size={17}/>:<Minus size={17}/>} {change}<small>session change</small></span></div><div className="market-summary-source"><span>{quote?`Trading date: ${date}`:loading?'Connecting to NGX…':'Market quote temporarily unavailable'}</span><p>{error&&quote?'Last received quote shown. Refresh is temporarily unavailable.':'End-of-day data · Automatically checked every 5 minutes.'}</p><div><a href={sourceUrl} target="_blank" rel="noopener noreferrer">Source: Nigerian Exchange <ArrowUpRight size={13}/></a><button onClick={refresh} disabled={loading} aria-label="Refresh market quote"><RefreshCw size={13} className={loading?'quote-refreshing':''}/>{loading?'Checking…':'Refresh'}</button></div></div></div>;
}
