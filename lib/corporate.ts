import sourcePages from './corporate/pages.json';
import sourceLeaders from './corporate/leaders.json';
export type ContentBlock={type:string;text:string;id:string};
export type Resource={label:string;href:string;year:string;format:string};
export type CorporatePage={title:string;family:string;source:string;intro:string;date?:string;blocks:ContentBlock[];documents:Resource[];links:{label:string;href:string}[];images:string[];tables:string[][][];faqs:{question:string;answer:string}[]};
export const corporatePages=sourcePages as Record<string,CorporatePage>;
export const leaders=sourceLeaders;
export const pageDesign:Record<string,{category:string;heading:string;intro:string;image:string}>={
 policies:{category:'Corporate governance',heading:'Policies for a responsible business.',intro:'Explore the corporate policies and standards that guide BUA Cement.',image:'leadership'},
 operations:{category:'Our operations',heading:'Strength, at the source.',intro:'Explore the facilities, products and distribution network behind BUA Cement.',image:'industrial-hero'},
 edoplant:{category:'Edo · South-South Nigeria',heading:'Made in Obu. Built for progress.',intro:'Discover our manufacturing facilities in Okpella, Edo State.',image:'plant-edo'},
 sokotoplant:{category:'Sokoto · North-West Nigeria',heading:'A strong foundation in the North.',intro:'Explore our manufacturing operations in Kalambaina, Sokoto State.',image:'plant-sokoto'},
 product:{category:'Our products',heading:'Quality you can build on.',intro:'Cement for the foundations, structures and spaces that shape our everyday lives.',image:'product'},
 investors:{category:'Investor relations',heading:'A clear view. A stronger perspective.',intro:'Financial reporting, corporate updates and information for our shareholders.',image:'hero'},
 financialreport:{category:'Investor resources',heading:'Our performance, in perspective.',intro:'Browse financial statements, annual reports and accounts by year.',image:'hero'},
 eventsandpresentations:{category:'Investor resources',heading:'Open dialogue. Shared ambition.',intro:'Explore company presentations, meeting notices and AGM resources.',image:'hero'},
 governance:{category:'Corporate governance',heading:'Trust is built on accountability.',intro:'Our approach to leadership, oversight and responsible business.',image:'leadership'},
 codeofethics:{category:'Corporate governance',heading:'Principles that guide our actions.',intro:'Explore the standards that shape our decisions and conduct.',image:'people'},
 committees:{category:'Corporate governance',heading:'Oversight with purpose.',intro:'Discover the board committees supporting responsible governance.',image:'leadership'},
 shareholderservices:{category:'Investor resources',heading:'Supporting every shareholder.',intro:'Find forms, dividend information and shareholder resources.',image:'hero'},
 investorfaqs:{category:'Investor resources',heading:'Your questions. Clear answers.',intro:'Find answers to frequently asked questions about investing in BUA Cement.',image:'hero'},
 financialpress:{category:'Investor resources',heading:'The story behind the numbers.',intro:'Explore published financial announcements and company updates.',image:'hero'},
 distributors:{category:'Our distribution network',heading:'Closer to your next project.',intro:'Connect with our depots and distribution network across Nigeria.',image:'logistics'},
 newsroom:{category:'Inside BUA Cement',heading:'Progress, in perspective.',intro:'Stories from our people, operations, communities and business.',image:'news-people'},
 pressreleases:{category:'Newsroom',heading:'The latest from BUA Cement.',intro:'Browse company announcements, milestones and news from our communities.',image:'hero'},
 media:{category:'Newsroom',heading:'Our world, in pictures.',intro:'Explore our plants, people and moments that bring BUA Cement to life.',image:'plant-edo'},
 careers:{category:'Careers at BUA',heading:'Your next chapter. Our shared future.',intro:'Discover our people, culture and opportunities to contribute.',image:'news-people'},
 workingatbua:{category:'Careers at BUA',heading:'Bring your ambition. Build together.',intro:'Learn about working at BUA Cement and the principles that connect our teams.',image:'people'},
 vacancies:{category:'Careers at BUA',heading:'Find your place in our story.',intro:'Explore roles published on the company’s careers website.',image:'news-people'},
 sustainability:{category:'Our responsibility',heading:'Progress with responsibility.',intro:'Explore our focus on the environment, people and the communities around us.',image:'environment'},
 contact:{category:'Contact BUA Cement',heading:'Let’s build a conversation.',intro:'Find the right team for your question, enquiry or partnership.',image:'office'},
 history:{category:'About BUA Cement',heading:'Every foundation has a story.',intro:'Explore milestones in the development of BUA Cement.',image:'history-hero'},
 merger:{category:'About BUA Cement',heading:'Two legacies. One shared future.',intro:'Discover the merger of CCNN and Obu Cement that brought BUA Cement Plc together.',image:'plant-edo'},
 leadership:{category:'About BUA Cement',heading:'People who lead. A purpose that unites.',intro:'Meet our board of directors and management team.',image:'leadership'},
 'company-profile':{category:'About BUA Cement',heading:'What we stand for. How we move forward.',intro:'Our purpose, philosophy and the values that guide our work.',image:'people'},
};
export const hubs:Record<string,{label:string;href:string;image:string}[]>={
 operations:[{label:'Edo plant',href:'/edoplant',image:'plant-edo'},{label:'Sokoto plant',href:'/sokotoplant',image:'plant-sokoto'},{label:'Our products',href:'/product',image:'product'},{label:'Find a depot',href:'/distributors#location',image:'logistics'}],
 investors:[{label:'Financial reports',href:'/financialreport',image:'hero'},{label:'Events & presentations',href:'/eventsandpresentations',image:'news-people'},{label:'Corporate governance',href:'/governance',image:'leadership'},{label:'Shareholder services',href:'/shareholderservices',image:'office'}],
 governance:[{label:'Code of ethics',href:'/codeofethics',image:'people'},{label:'Board of directors',href:'/leadership',image:'leadership'},{label:'Board committees',href:'/committees',image:'hero'}],
 careers:[{label:'Working at BUA',href:'/workingatbua',image:'people'},{label:'Career opportunities',href:'/vacancies',image:'news-people'}],
 newsroom:[{label:'Press releases',href:'/pressreleases',image:'hero'},{label:'Media gallery',href:'/media',image:'plant-edo'},{label:'Media enquiries',href:'/contact',image:'office'}],
};
export function resolvePage(path:string){const alias:Record<string,string>={'/distributor':'/distributors','/career':'/careers','/about/leadership':'/leadership'};const key=alias[path]||path;if(corporatePages[key])return corporatePages[key];try{return corporatePages[decodeURIComponent(key)]}catch{return undefined}}
