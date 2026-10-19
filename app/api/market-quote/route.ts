import { parseNgxQuote } from '../../../lib/market-quote';
export const dynamic = 'force-dynamic';
// Public issuer feed used by the existing BUA Cement website. Keep upstream requests server-side.
const publicIssuerFeed = 'https://marketdataapiv3.ngxgroup.com/v3/api/price/issuersharepriceEOD.json?s=BUACEMENT&_t=3ace4d62a2c94c9a879fbc79a92689a7';
export async function GET(){
 try{
  const response=await fetch(publicIssuerFeed,{signal:AbortSignal.timeout(12000),headers:{Accept:'application/json',Referer:'https://www.buacement.com/',Origin:'https://www.buacement.com'}});
  if(!response.ok)throw new Error('Upstream unavailable');
  const quote=parseNgxQuote(await response.json());
  return Response.json(quote,{headers:{'Cache-Control':'public, max-age=60, s-maxage=300'}});
 }catch{
  return Response.json({error:'Market quote temporarily unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});
 }
}
