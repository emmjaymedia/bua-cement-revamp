export const official = 'https://www.buacement.com';
export function siteHref(path:string){
 let value=path;
 if(/^https?:/.test(value)){try{const url=new URL(value);if(!['www.buacement.com','buacement.com'].includes(url.hostname))return value;value=url.pathname+url.search+url.hash}catch{return value}}
 if(/\.(pdf|xlsx?|docx?|zip|mp4|mp3)(?:[?#]|$)/i.test(value)||value.startsWith('/documents/'))return official+value;
 if(value.startsWith('mailto:')||value.startsWith('tel:')||value.startsWith('#'))return value;
 if(value==='/aboutus')return '/about';
 if(value.startsWith('/about/leadership'))return value.replace('/about/leadership','/leadership');
 if(value==='/distributor')return '/distributors';
 if(value.startsWith('/distributor#'))return value.replace('/distributor#','/distributors#');
 return value;
}
export type NavigationLink = { label: string; path: string; children?: NavigationLink[] };
export type NavigationGroup = { label: string; intro: string; links: NavigationLink[] };
export const aboutSubmenus = [
 {label:'Our history',links:[{label:'History of BUA',path:'/history'},{label:'The merger',path:'/merger'}]},
 {label:'Leadership',links:[{label:'Board of directors',path:'/leadership'},{label:'Management team',path:'/leadership/#management'}]},
 {label:'Company profile',links:[{label:'Company overview',path:'/company-profile'},{label:'Awards',path:'/about#recognition'},{label:'Mission & vision',path:'/company-profile#vision'},{label:'Core values',path:'/company-profile#values'},{label:'Corporate philosophy',path:'/company-profile#philosophy'}]},
];
export const navigation: NavigationGroup[] = [
 {label:'About us',intro:'The people and purpose behind BUA Cement.',links:[{label:'Our company',path:'/aboutus'},{label:'Our history',path:'/history'},{label:'The merger',path:'/merger'},{label:'Board of directors',path:'/leadership'},{label:'Management team',path:'/leadership/#management'},{label:'Company profile',path:'/company-profile'},{label:'Mission & vision',path:'/company-profile#vision'},{label:'Our core values',path:'/company-profile#values'},{label:'Corporate philosophy',path:'/company-profile#philosophy'}]},
 {label:'Operations',intro:'From our plants to the places you build.',links:[{label:'Our operations',path:'/operations'},{label:'Plants',path:'/edoplant',children:[{label:'Edo plant',path:'/edoplant'},{label:'Sokoto plant',path:'/sokotoplant'}]},{label:'Our products',path:'/product'}]},
 {label:'Investors',intro:'A clear view of our business.',links:[{label:'Investor relations',path:'/investors'},{label:'Financial reports',path:'/financialreport'},{label:'Events & presentations',path:'/eventsandpresentations'},{label:'Corporate governance',path:'/governance',children:[{label:'Governance overview',path:'/governance'},{label:'Code of ethics',path:'/codeofethics'},{label:'Board of directors',path:'/leadership'},{label:'Board committees',path:'/committees'}]},{label:'Financial press releases',path:'/financialpress'},{label:'Shareholder services',path:'/shareholderservices'},{label:'Investor FAQs',path:'/investorfaqs'}]},
 {label:'Distributors',intro:'Connect with our distribution network.',links:[{label:'Distribution network',path:'/distributors'},{label:'Find a depot',path:'/distributors#location'},{label:'Become a distributor',path:'/distributors#become'}]},
 {label:'Newsroom',intro:'Stories from across BUA Cement.',links:[{label:'Latest updates',path:'/newsroom'},{label:'Press releases',path:'/pressreleases'},{label:'Media gallery',path:'/media'},{label:'Media enquiries',path:'/contact'}]},
 {label:'Careers',intro:'Find your place in our story.',links:[{label:'Careers at BUA',path:'/careers'},{label:'Working at BUA',path:'/workingatbua'},{label:'Vacancies',path:'/vacancies'}]},
];
export const places = [
 {id:'edo',name:'Edo plant',eyebrow:'Manufacturing · South-South Nigeria',region:'Edo State',image:'plant-edo',description:'At Obu, Okpella, our Edo facility is part of the industrial infrastructure supporting construction across Nigeria.',path:'/edoplant',x:210,y:425},
 {id:'sokoto',name:'Sokoto plant',eyebrow:'Manufacturing · North-West Nigeria',region:'Sokoto State',image:'plant-sokoto',description:'Our Kalambaina facility connects northern Nigeria with BUA Cement’s manufacturing and distribution network.',path:'/sokotoplant',x:155,y:70},
 {id:'lagos',name:'Lagos head office',eyebrow:'Corporate office · South-West Nigeria',region:'Lagos State',image:'office',description:'5th Floor, BUA Towers, PC 32, Churchgate Street, Victoria Island, Lagos, Nigeria.',path:'/contact',x:55,y:459}
];
export const stories = [
 {
  "tag": "Financial results",
  "date": "23 July 2026",
  "title": "BUA Cement profit jumps 80% on cost discipline and new markets entry",
  "description": "BUA CEMENT PROFIT JUMPS 80% TO N324.9BN ON COST DISCIPLINE, NEW MARKETS ENTRY",
  "image": "news-people",
  "path": "/pressreleases/BUA-CEMENT-PROFIT-JUMPS-80%25-TO-N324.9BN-ON-COST-DISCIPLINE,-NEW-MARKETS-ENTRY?id=31"
 },
 {
  "tag": "Community",
  "date": "02 July 2026",
  "title": "BUA Cement supports 211 Sokoto farmers with farm inputs",
  "description": "BUA Cement Distributes N108m Farm Inputs to 211 Sokoto Farmers",
  "image": "news-farming",
  "path": "/pressreleases/BUA-Cement-Distributes-N108m-Farm-Inputs-to-211-Sokoto-Farmers?id=30"
 },
 {
  "tag": "Environment",
  "date": "10 June 2026",
  "title": "Marking World Environment Day with action and community engagement",
  "description": "BUA CEMENT COMMEMORATES WORLD ENVIRONMENT DAY 2026 WITH TREE PLANTING, COMMUNITY ENGAGEMENT AND CLIMATE ACTION DISCUSSIONS",
  "image": "news-environment",
  "path": "/pressreleases/BUA-CEMENT-COMMEMORATES-WORLD-ENVIRONMENT-DAY-2026-WITH-TREE-PLANTING,-COMMUNITY-ENGAGEMENT-AND-CLIMATE-ACTION-DISCUSSIONS?id=29"
 },
 {
  "tag": "Shareholders",
  "date": "21 May 2026",
  "title": "Strong 2025 performance and a ₦10 dividend per share",
  "description": "BUA CEMENT EXCITES SHAREHOLDERS WITH STRONG 2025 FINANCIAL PERFORMANCE, APPROVES N10.00 DIVIDEND PER SHARE",
  "image": "news-28",
  "path": "/pressreleases/BUA-CEMENT-EXCITES-SHAREHOLDERS-WITH-STRONG-2025-FINANCIAL-PERFORMANCE,-APPROVES-N10.00-DIVIDEND-PER-SHARE?id=28"
 },
 {
  "tag": "Company notice",
  "date": "28 April 2026",
  "title": "Notice of the 10th Annual General Meeting",
  "description": "Notice of 10th Annual General Meeting.",
  "image": "news-27",
  "path": "/pressreleases/Notice-of-10th-Annual-General-Meeting.?id=27"
 },
 {
  "tag": "Partnerships",
  "date": "25 April 2026",
  "title": "BUA Cement rewards top distributors at the 2025 awards",
  "description": "BUA CEMENT REWARDS TOP DISTRIBUTORS AT 2025 DISTRIBUTORS’ AWARDS",
  "image": "news-26",
  "path": "/pressreleases/BUA-CEMENT-REWARDS-TOP-DISTRIBUTORS-AT-2025-DISTRIBUTORS%E2%80%99-AWARDS?id=26"
 },
 {
  "tag": "Recognition",
  "date": "04 February 2026",
  "title": "BUA Cement wins NGX 2025 Most Compliant Listed Company",
  "description": "BUA Cement Wins NGX 2025 Most Compliant Listed Company",
  "image": "news-20",
  "path": "/pressreleases/BUA-Cement-Wins-NGX-2025-Most-Compliant-Listed-Company?id=20"
 },
 {
  "tag": "Operations",
  "date": "21 January 2026",
  "title": "BUA Cement signs agreement with CBMI for Sokoto Line 6",
  "description": "BUA Cement Signs Agreement With CBMI To Build 3-million-ton-per-annum Sokoto Line 6",
  "image": "news-25",
  "path": "/pressreleases/BUA-Cement-Signs-Agreement-With-CBMI-To-Build-3-million-ton-per-annum-Sokoto-Line-6?id=25"
 },
 {
  "tag": "Community",
  "date": "05 August 2025",
  "title": "Building skills: heavy-duty equipment training for host community youths",
  "description": "BUA Cement Sokoto Launches Transformative Heavy-Duty Equipment Training Program for 60 Host Community Youths",
  "image": "news-24",
  "path": "/pressreleases/--BUA-Cement-Sokoto-Launches-Transformative-Heavy-Duty-Equipment-Training-Program-for-60-Host-Community-Youths?id=24"
 },
 {
  "tag": "Financial results",
  "date": "21 July 2025",
  "title": "BUA Cement records strong revenue growth and announces dividend",
  "description": "BUA Cement Plc Records Strong Revenue Growth of 90.5% To N867.5 Billion, Pays N2.05 Dividend Per Share",
  "image": "news-23",
  "path": "/pressreleases/BUA-Cement-Plc-Records-Strong-Revenue-Growth-of-90.5%25-To-N867.5-Billion,-Pays-N2.05-Dividend-Per-Share?id=23"
 }
];
