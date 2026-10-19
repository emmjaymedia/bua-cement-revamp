import { nigeriaMap } from '../lib/nigeria-map';
import { ArrowUpRight, ArrowRight, Layers, Factory, Handshake } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import WhoWeAre from '../components/who-we-are';
import { Hero, Locations } from '../components/home-interactions';
import { siteHref, official } from '../lib/content';
import NewsCarousel from '../components/news-carousel';
export default function Home(){
 const map=nigeriaMap;
 return <div id="top"><Header/><main id="main"><Hero/>
 <div className="news-ribbon"><span><i/> IN FOCUS</span><p>Discover the latest developments from BUA Cement.</p><a href="#news">Explore our stories <ArrowRight size={17}/></a></div>
 <Locations map={map}/>
 <WhoWeAre/>

 <section className="intro section" id="about"><div className="intro-label"><span className="eyebrow">We are BUA Cement</span><span className="section-number">01 / A stronger foundation</span></div><div className="intro-main"><h2>More than cement.<br/>A foundation for <em>progress.</em></h2><div className="intro-copy"><p>Behind every structure is a vision. We help bring it to life with cement made in Nigeria, for the people building its future.</p><p>From our plants in Edo and Sokoto to the communities we serve, our focus is simple: quality, partnership, and lasting value.</p><a className="text-link" href="/about">Get to know BUA Cement <ArrowUpRight size={18}/></a></div></div>
 <div className="purpose-grid" id="possibilities"><a className="purpose-card" href={siteHref('/product')}><div className="purpose-image"><img src="/images/product.webp" alt="BUA Cement product bags" loading="lazy"/><span className="circle-arrow"><ArrowUpRight/></span><span className="card-index">01</span></div><div className="purpose-title"><Layers size={20}/><h3>Quality you can build on.</h3></div><p>Discover cement for block-making, plastering, and concrete works.</p><span className="small-link">Explore our products <ArrowRight size={15}/></span></a><a className="purpose-card" href="#locations"><div className="purpose-image"><img src="/images/plant-edo.webp" alt="BUA Cement manufacturing facility in Edo" loading="lazy"/><span className="circle-arrow"><ArrowUpRight/></span><span className="card-index">02</span></div><div className="purpose-title"><Factory size={20}/><h3>Strength, at the source.</h3></div><p>Explore the facilities at the heart of our manufacturing operations.</p><span className="small-link">Discover our plants <ArrowRight size={15}/></span></a><a className="purpose-card" href={siteHref('/distributors')}><div className="purpose-image"><img src="/images/logistics.webp" alt="Distribution truck at a BUA Cement facility" loading="lazy"/><span className="circle-arrow"><ArrowUpRight/></span><span className="card-index">03</span></div><div className="purpose-title"><Handshake size={20}/><h3>Built on partnership.</h3></div><p>Connect with a distribution network that brings us closer to you.</p><span className="small-link">Partner with us <ArrowRight size={15}/></span></a></div></section>
 <section className="news-section section" id="news"><div className="section-head"><div><span className="eyebrow">Inside BUA Cement</span><h2>Progress, in perspective.</h2></div><a href={siteHref('/newsroom')} className="text-link">Visit our newsroom <ArrowUpRight size={18}/></a></div><NewsCarousel/></section>

 </main><Footer showConnect={false}/></div>
}
