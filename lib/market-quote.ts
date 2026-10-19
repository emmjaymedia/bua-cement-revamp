export type MarketQuote = {
 symbol: 'BUACEMENT'; currency: 'NGN'; price: number; change: number | null; changePercent: number | null;
 tradeDate: string; sourceTimestamp: string | null; fetchedAt: string; source: 'Nigerian Exchange'; frequency: 'end-of-day';
};
export function parseNgxQuote(data:unknown,now=new Date()): MarketQuote {
 if(!Array.isArray(data))throw new Error('Invalid feed');
 const row=data.find((r:Record<string,unknown>)=>r?.Symbol==='BUACEMENT');
 if(!row||typeof row.Last!=='number'||!Number.isFinite(row.Last)||row.Last<=0||typeof row.TradeDate!=='string'||!Number.isFinite(Date.parse(row.TradeDate)))throw new Error('Invalid BUACEMENT quote');
 const numberOrNull=(v:unknown)=>typeof v==='number'&&Number.isFinite(v)?v:null;
 return {symbol:'BUACEMENT',currency:'NGN',price:row.Last,change:numberOrNull(row.Change),changePercent:numberOrNull(row.PerChange),tradeDate:row.TradeDate.slice(0,10),sourceTimestamp:typeof row.Timestamp==='string'&&Number.isFinite(Date.parse(row.Timestamp))?row.Timestamp:null,fetchedAt:now.toISOString(),source:'Nigerian Exchange',frequency:'end-of-day'};
}
export function isMarketQuote(data:unknown):data is MarketQuote{
 if(!data||typeof data!=='object')return false;const q=data as Record<string,unknown>;
 const numeric=(value:unknown)=>value===null||(typeof value==='number'&&Number.isFinite(value));
 return q.symbol==='BUACEMENT'&&q.currency==='NGN'&&q.source==='Nigerian Exchange'&&q.frequency==='end-of-day'&&typeof q.price==='number'&&Number.isFinite(q.price)&&q.price>0&&numeric(q.change)&&numeric(q.changePercent)&&typeof q.tradeDate==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(q.tradeDate)&&Number.isFinite(Date.parse(q.tradeDate))&&typeof q.fetchedAt==='string'&&Number.isFinite(Date.parse(q.fetchedAt))&&(q.sourceTimestamp===null||(typeof q.sourceTimestamp==='string'&&Number.isFinite(Date.parse(q.sourceTimestamp))));
}
