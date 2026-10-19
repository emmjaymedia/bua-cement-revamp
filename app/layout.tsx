import type { Metadata } from 'next';
import './globals.css';
import { MarketQuoteProvider } from '../components/market-quote';
export const metadata: Metadata = {title:'BUA Cement — Strong foundations. Limitless possibilities.',description:'Discover BUA Cement. Explore our Nigerian operations, products, partnerships, sustainability and investor resources.',icons:{icon:'/images/logo.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><MarketQuoteProvider>{children}</MarketQuoteProvider></body></html>}
