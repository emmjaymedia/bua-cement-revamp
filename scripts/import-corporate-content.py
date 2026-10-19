"""Import reviewed public corporate content into typed, local frontend data. No runtime scraping."""
from pathlib import Path
from bs4 import BeautifulSoup
import json,re,hashlib,requests,concurrent.futures,io
from PIL import Image
from urllib.parse import urljoin,urlparse,unquote
import argparse
parser=argparse.ArgumentParser();parser.add_argument('--source-dir',type=Path,required=True);args=parser.parse_args()
SOURCE=args.source_dir;OUT=Path('lib/corporate');BASE='https://www.buacement.com'
titles={'history':'Our history','merger':'The merger','leadership':'Our leadership','company-profile':'Company profile','operations':'Our operations','edoplant':'Edo plant','sokotoplant':'Sokoto plant','product':'Our products','investors':'Investor relations','financialreport':'Financial reports','eventsandpresentations':'Events & presentations','governance':'Corporate governance','codeofethics':'Code of ethics','committees':'Board committees','financialpress':'Financial press releases','shareholderservices':'Shareholder services','investorfaqs':'Investor FAQs','distributors':'Our distribution network','newsroom':'Newsroom','pressreleases':'Press releases','media':'Media gallery','careers':'Careers at BUA','workingatbua':'Working at BUA','vacancies':'Career opportunities','sustainability':'Sustainability','contact':'Contact us','policies':'Corporate policies'}
images={};pages={};leaders=[]
def text(t):return re.sub(r'\s+',' ',t.get_text(' ',strip=True)).strip()
def image(src):
 if not src or any(v in src.lower() for v in ['/icon/','logo','blank','loader','arrow','read_more','go_ic']):return ''
 url=urljoin(BASE+'/',src);name='source-'+hashlib.sha1(url.encode()).hexdigest()[:12]+'.webp';images[url]=name;return '/images/'+name
def local(h):
 if not h:return ''
 u=urljoin(BASE+'/',h);p=urlparse(u)
 return p.path+('?' + p.query if p.query else '')+('#'+p.fragment if p.fragment else '') if p.netloc in ['www.buacement.com','buacement.com'] and not re.search(r'\.(pdf|xlsx?|docx?|zip|mp4|mp3)$',p.path,re.I) else u
records=[{'path':'/'+n,'file':n+'.html'} for n in titles]+json.loads((SOURCE/'details.json').read_text())
for rec in records:
 if 'error' in rec:continue
 soup=BeautifulSoup((SOURCE/rec['file']).read_text(),'html.parser');main=soup.find('main')
 if not main:continue
 if rec['path'].startswith('/pressreleases/'):
  main=main.select_one('.post-wrapper') or main
 for el in main.select('.sociall-section,script,style,form,.video-carousel__carousel-container,.blog-sidebar'):el.decompose()
 key=unquote(urlparse(rec['path']).path).rstrip('/');route=key.strip('/');family=route.split('/')[0]
 if rec['path'].startswith('/pressreleases?'):continue
 hs=main.select('h1,h2,h3,h4,h5,h6');title=titles.get(route) or next((text(h) for h in hs if len(text(h))>4),'BUA Cement')
 if family=='leadership' and '/' in route:title=route.split('/')[-1].replace('-',' ')
 if family=='career':title=route.split('/')[-1].replace('_',' ')
 paras=[];blocks=[];seen=set();docs=[];links=[];photos=[];tables=[]
 for im in main.select('img[src],img[data-src]'):
  src=image(im.get('src') or im.get('data-src'))
  if src and src not in photos:photos.append(src)
 for a in main.select('a[href]'):
  href=a.get('href','').strip();label=text(a)
  if not href or href=='#' or href.lower().startswith('javascript:'):continue
  if re.search(r'\.(pdf|xlsx?|docx?|zip|mp3)(?:\?|$)',href,re.I):
   url=urljoin(BASE+'/',href)
   if url not in [d['href'] for d in docs]:docs.append({'label':label or unquote(urlparse(href).path.split('/')[-1]),'href':url,'year':next(iter(re.findall(r'20\d{2}',label)),''),'format':urlparse(href).path.split('.')[-1].upper()})
  elif label and label.lower() not in ['learn more','read more','read more press releases','1','2','3','4','5','next','previous']:
   h=local(href)
   if not any(v in h for v in ['facebook.com','instagram.com','linktr.ee','linkedin.com','x.com','youtube.com']):links.append({'label':label,'href':h})
 for table in main.select('table'):
  rows=[[text(c) for c in row.select('th,td')] for row in table.select('tr')];tables.append([r for r in rows if any(r)])
 for el in main.select('h1,h2,h3,h4,h5,h6,p,li'):
  if el.find_parent(['table','li']) or (el.name=='p' and el.find('li')):continue
  v=text(el)
  if not v or len(v)<3 or v in seen or v.lower() in ['learn more','read more','submit','send message','subscribe','file (pdf)'] or v.startswith('Download '):continue
  seen.add(v)
  if v.lower()==title.lower():continue
  kind='heading' if el.name.startswith('h') else 'text'
  if kind=='text' and len(v)<25 and el.name!='li' and family not in ['history','company-profile']:continue
  anchor=el.get('id') or next((p.get('id') for p in el.parents if p.get('id') and p is not main),'')
  blocks.append({'type':kind,'text':v,'id':anchor or ''})
  if kind=='text':paras.append(v)
 # Article body line breaks are authored paragraph boundaries on the source site.
 date=text(main.select_one('.date')) if main.select_one('.date') else ''
 if family=='pressreleases' and '/' in route:
  blocks=[]
  for p in main.select('.post-meta p'):
   parts=re.split(r'<br\s*/?>',str(p),flags=re.I)
   for part in parts:
    v=text(BeautifulSoup(part,'html.parser'))
    if v:blocks.append({'type':'text','text':v,'id':''})
 if route=='history':
  blocks=[]
  for item in main.select('.timeline-body'):
   year=item.select_one('.date');heading=item.select_one('h3');body=item.select_one('p')
   if heading:blocks.append({'type':'heading','text':(text(year)+' — ' if year else '')+text(heading),'id':''})
   if body:blocks.append({'type':'text','text':text(body),'id':''})
 # Questions and answers are structured rather than flattened.
 faqs=[]
 if route=='investorfaqs':
  for h in main.select('h3'):
   answer=h.find_next('p');faqs.append({'question':text(h),'answer':text(answer) if answer else ''})
 # Preserve board/management membership separately, including duplicated leaders.
 if route=='leadership':
  for section in main.select('.our-team'):
   group='Management team' if section.get('id')=='management' else 'Board of directors'
   for card in section.select('.team-member'):
    h=card.select_one('h6');a=card.select_one('a[href]');im=card.select_one('img');role=card.select_one('.text>span');p=card.select_one('p')
    if h:leaders.append({'name':text(h),'role':text(role) if role else '', 'group':group,'image':image(im.get('src')) if im else '', 'href':local(a['href']) if a else '/leadership','summary':text(p) if p else ''})
   if group=='Board of directors':
    leaders.insert(0,{'name':'Abdul Samad Rabiu','role':'Chairman','group':group,'image':'/images/leader-rabiu.webp','href':'/leadership/Abdul-Samad-Rabiu','summary':text(section.select_one('.text-module__text p'))})
 intro=next((v for v in paras if 45<len(v)<700),'')
 pages[key]={'title':title,'family':family,'source':BASE+rec['path'],'intro':intro,'blocks':blocks,'documents':docs,'links':list({x['href']:x for x in links}.values()),'images':photos[:60 if family=='media' else 8],'tables':tables,'faqs':faqs,'date':date}
for leader in leaders:
 key=unquote(urlparse(leader['href']).path)
 if key in pages:pages[key]['title']=leader['name']
# Chairman biography is sourced from the leadership overview.
chair=leaders[0];pages['/leadership/Abdul-Samad-Rabiu']={'title':chair['name'],'family':'leadership','source':BASE+'/leadership','intro':chair['role'],'blocks':[{'type':'text','text':chair['summary'],'id':''}],'documents':[],'links':[],'images':[chair['image']],'tables':[],'faqs':[]}
# Additional news pages link to further original stories; their import is handled in the capture stage.
def download(item):
 url,name=item;path=Path('public/images')/name
 if path.exists():return
 try:
  r=requests.get(url,timeout=40);r.raise_for_status();im=Image.open(io.BytesIO(r.content));im.thumbnail((1600,1400));im.convert('RGB').save(path,'WEBP',quality=83)
 except Exception as e:print('IMAGE FAILED',url,str(e),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:list(pool.map(download,images.items()))
OUT.mkdir(exist_ok=True);(OUT/'pages.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2));(OUT/'leaders.json').write_text(json.dumps(leaders,ensure_ascii=False,indent=2));(OUT/'image-sources.json').write_text(json.dumps(images,indent=2));print('Imported',len(pages),'pages,',len(leaders),'leader cards,',len(images),'images',flush=True)
