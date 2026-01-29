import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://motivational-quote.org';
const blogTitle = 'Motivational Quotes Blog';
const blogDescription = 'Practical advice and actionable strategies for personal growth, productivity, and living with purpose.';

// Read blog posts
const posts = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../client/public/data/blog-posts.json'), 'utf-8')
);

// Sort posts by published date (newest first)
const sortedPosts = posts.sort((a, b) => 
  new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
);

// Generate RSS 2.0 feed
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${blogTitle}</title>
    <link>${baseUrl}/blog</link>
    <description>${blogDescription}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${sortedPosts.slice(0, 20).map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.category}/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.category}/${post.slug}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <description>${escapeXml(post.meta_description)}</description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <category>${post.category}</category>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`).join('')}
  </channel>
</rss>`;

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Write RSS feed
const outputPath = path.join(__dirname, '../client/public/rss.xml');
fs.writeFileSync(outputPath, rss.trim());

console.log(`✅ Generated RSS feed with ${Math.min(sortedPosts.length, 20)} articles`);
console.log(`📁 Output: ${outputPath}`);
