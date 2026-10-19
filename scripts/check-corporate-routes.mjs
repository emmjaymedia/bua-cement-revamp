import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const content=ts.transpileModule(fs.readFileSync('lib/content.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {navigation,aboutSubmenus,places,stories,siteHref}=await import('data:text/javascript;base64,'+Buffer.from(content).toString('base64'));
const pages=JSON.parse(fs.readFileSync('lib/corporate/pages.json','utf8'));
const known=new Set(['/', '/about','/aboutus',...Object.keys(pages)]);
const links=[...navigation.flatMap(g=>g.links.flatMap(l=>[l,...(l.children||[])])),...aboutSubmenus.flatMap(g=>g.links),...places,...stories];
const bad=[];
for(const l of links){const href=siteHref(l.path);const u=new URL(href,'https://local.test');if(u.origin!=='https://local.test')continue;const path=decodeURIComponent(u.pathname).replace(/\/$/,'')||'/';if(!known.has(path))bad.push({label:l.label||l.title||l.name,path})}
assert.deepEqual(bad,[],'Navigation must resolve to local pages');
for(const [path,page] of Object.entries(pages)){
 assert(page.title&&page.source.startsWith('https://www.buacement.com/'),path+' needs source provenance');
 assert(page.blocks.length||page.images.length||page.documents.length,path+' must have original content');
 for(const image of page.images)assert(fs.existsSync('public'+image),path+' missing '+image);
 for(const doc of page.documents){assert(doc.label&&['www.buacement.com','buacement.com'].includes(new URL(doc.href).hostname),path+' invalid document');assert(['PDF','MP3','XLS','XLSX','DOC','DOCX','ZIP'].includes(doc.format),'Unsupported resource '+doc.format)}
}
for(const anchor of ['philosophy','vision','values'])assert(pages['/company-profile'].blocks.some(b=>b.id===anchor),'Missing company profile anchor '+anchor);
assert.equal(siteHref('/documents/test.pdf'),'https://www.buacement.com/documents/test.pdf');
assert.equal(siteHref('https://www.buacement.com/operations'),'/operations');
console.log(`Passed: ${links.length} navigation/content destinations, ${Object.keys(pages).length} sourced pages, all local page images, document metadata and company-profile anchors.`);
const milestones=JSON.parse(fs.readFileSync('lib/corporate/history.json','utf8'));
assert.deepEqual(milestones.map(m=>m.year),['2008','2009','2015','2017','2018','2020','2021','2022']);
for(const milestone of milestones){assert(milestone.title&&milestone.text&&milestone.label,'Incomplete history milestone');assert(fs.existsSync('public'+milestone.image),'Missing photograph for '+milestone.year)}
console.log('Passed: eight chronological history milestones with descriptions and original photographs.');
