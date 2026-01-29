import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read blog posts
const blogPostsPath = path.join(__dirname, '../client/public/data/blog-posts.json');
const blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf-8'));

const baseUrl = 'https://motivational-quote.org';
const currentDate = new Date().toISOString();

// Static pages
const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/blog', priority: 0.9, changefreq: 'daily' },
  { url: '/about', priority: 0.7, changefreq: 'monthly' },
  { url: '/contact', priority: 0.6, changefreq: 'monthly' },
  { url: '/privacy', priority: 0.3, changefreq: 'monthly' },
  { url: '/terms', priority: 0.3, changefreq: 'monthly' },
  { url: '/cookie-disclosure', priority: 0.3, changefreq: 'monthly' },
  { url: '/editorial-policy', priority: 0.3, changefreq: 'monthly' },
  { url: '/attribution', priority: 0.3, changefreq: 'monthly' },
];

// Generate sitemap XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Add static pages
for (const page of staticPages) {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += '  </url>\n';
}

// Add blog posts
for (const post of blogPosts) {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}/blog/${post.category}/${post.slug}</loc>\n`;
  xml += `    <lastmod>${post.published_at}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.8</priority>\n`;
  xml += '  </url>\n';
}

xml += '</urlset>';

// Write sitemap
const sitemapPath = path.join(__dirname, '../client/public/sitemap.xml');
fs.writeFileSync(sitemapPath, xml);

console.log(`✅ Generated sitemap with ${staticPages.length + blogPosts.length} URLs`);
console.log(`📁 Output: ${sitemapPath}`);
