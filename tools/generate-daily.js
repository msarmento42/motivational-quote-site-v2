#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QUEUE = path.join(ROOT, 'content', 'queue.json');
const TEMPLATE = path.join(ROOT, 'templates', 'post.html');
const SITEMAP = path.join(ROOT, 'sitemap.xml');

function loadJson(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }
function saveJson(p,v){ fs.writeFileSync(p, JSON.stringify(v,null,2)+'\n'); }

function escapeHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function render(tpl, vars){
  return tpl
    .replaceAll('{{TITLE}}', vars.title)
    .replaceAll('{{DESCRIPTION}}', vars.description)
    .replaceAll('{{SLUG}}', vars.slug)
    .replaceAll('{{DATE}}', vars.date)
    .replaceAll('{{YEAR}}', String(vars.year))
    .replaceAll('{{QUOTES}}', vars.quotesHtml);
}

function addToSitemap(slug){
  const url = `https://motivational-quote.org/${slug}.html`;
  let xml = fs.readFileSync(SITEMAP, 'utf8');
  if (xml.includes(url)) return;
  const insert = `  <url>\n    <loc>${url}</loc>\n  </url>\n`;
  xml = xml.replace(/<\/urlset>\s*$/i, insert + '</urlset>\n');
  fs.writeFileSync(SITEMAP, xml);
}

function main(){
  const queue = loadJson(QUEUE);
  if (!Array.isArray(queue) || queue.length === 0) {
    console.error('Queue empty:', QUEUE);
    process.exit(1);
  }
  const item = queue.shift();
  const slug = item.slug;
  const outPath = path.join(ROOT, `${slug}.html`);
  if (fs.existsSync(outPath)) {
    console.error('Post already exists:', outPath);
    process.exit(2);
  }

  // Lightweight quote list (can be expanded later)
  const quotes = [
    'One step at a time still counts.',
    'You don\'t need confidence to start; you need a start.',
    'Small progress beats perfect plans.',
    'Do the next right thing.',
    'Consistency is a superpower.'
  ];
  const quotesHtml = quotes.map(q => `<li>${escapeHtml(q)}</li>`).join('\n        ');

  const tpl = fs.readFileSync(TEMPLATE, 'utf8');
  const now = new Date();
  const vars = {
    title: item.title,
    description: item.description,
    slug,
    date: now.toISOString().slice(0,10),
    year: now.getUTCFullYear(),
    quotesHtml,
  };
  fs.writeFileSync(outPath, render(tpl, vars));
  saveJson(QUEUE, queue);
  addToSitemap(slug);
  console.log('Generated', outPath);
}

main();
