import Header from '../components/header';
import Footer from '../components/footer';
import {ArrowRight} from 'lucide-react';
export default function NotFound(){return <div id="top"><Header solid/><main id="main" style={{padding:'180px 8% 100px',minHeight:'70vh'}}><span className="eyebrow">Page not found</span><h1 style={{fontSize:'clamp(38px,5vw,70px)',fontWeight:450,letterSpacing:'-2px',margin:'25px 0'}}>Let’s find your next step.</h1><p style={{marginBottom:30,lineHeight:1.8}}>The page you requested could not be found. Explore BUA Cement from our homepage.</p><a className="button button-dark" href="/">Back to the homepage <ArrowRight size={17}/></a></main><Footer/></div>}
