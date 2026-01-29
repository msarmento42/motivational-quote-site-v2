import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the blog posts markdown file
const rawContent = fs.readFileSync(
  path.join(__dirname, '../attached_assets/motivational quote blog posts_1763711891677.md'),
  'utf-8'
);

const lines = rawContent.split('\n');
const posts = [];
let currentPost = null;
let inFrontmatter = false;
let inContent = false;
let frontmatterLines = [];
let contentLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this is a new post header
  if (line.match(/^### \*\*/)) {
    // Save previous post if exists
    if (currentPost && contentLines.length > 0) {
      // Process content - remove ALL backticks
      let content = contentLines.join('\n');
      content = content.replace(/`/g, '').trim();
      
      // Parse frontmatter
      const frontmatter = parseFrontmatter(frontmatterLines);
      
      // Convert markdown to HTML
      let htmlContent = marked.parse(content);
      
      // Clean up whitespace in block elements only (preserves inline spacing)
      htmlContent = cleanBlockWhitespace(htmlContent);
      
      posts.push({
        ...frontmatter,
        category: currentPost.category,
        content: htmlContent,
      });
    }
    
    // Extract path - try both formats
    let pathMatch = line.match(/\d+\\\) `(.+?)`/); // Format 1
    if (!pathMatch) {
      pathMatch = line.match(/`\d+\) (.+?)`/); // Format 2
    }
    
    if (pathMatch) {
      const filePath = pathMatch[1];
      const categoryMatch = filePath.match(/\/content\/posts\/([^/]+)\//);
      if (categoryMatch) {
        currentPost = { category: categoryMatch[1] };
        frontmatterLines = [];
        contentLines = [];
        inFrontmatter = false;
        inContent = false;
      }
    }
  }
  // Check for frontmatter start
  else if (line.trim() === '`---`' && !inFrontmatter && !inContent) {
    inFrontmatter = true;
  }
  // Check for frontmatter end
  else if (line.trim() === '`---`' && inFrontmatter) {
    inFrontmatter = false;
    inContent = true;
  }
  // Collect frontmatter lines
  else if (inFrontmatter) {
    frontmatterLines.push(line);
  }
  // Collect content lines (stop at --- separator or **Suggested internal links**)
  else if (inContent) {
    if (line.trim() === '---' || line.includes('**Suggested internal links**')) {
      continue;
    }
    contentLines.push(line);
  }
}

// Don't forget the last post
if (currentPost && contentLines.length > 0) {
  let content = contentLines.join('\n');
  content = content.replace(/`/g, '').trim();
  const frontmatter = parseFrontmatter(frontmatterLines);
  let htmlContent = marked.parse(content);
  htmlContent = cleanBlockWhitespace(htmlContent);
  
  posts.push({
    ...frontmatter,
    category: currentPost.category,
    content: htmlContent,
  });
}

function cleanBlockWhitespace(html) {
  // Clean whitespace inside block elements while preserving inline spacing
  // This targets: <li>, <p>, <h1-6>, <blockquote>, etc.
  
  // Remove trailing whitespace before closing tags of block elements
  html = html.replace(/\s+<\/(li|p|h[1-6]|blockquote|div)>/g, '</$1>');
  
  // Remove leading whitespace after opening tags of block elements
  html = html.replace(/<(li|p|h[1-6]|blockquote|div)>\s+/g, '<$1>');
  
  // Normalize multiple newlines to single newlines
  html = html.replace(/\n{3,}/g, '\n\n');
  
  return html;
}

function parseFrontmatter(lines) {
  const frontmatter = {};
  let currentKey = '';
  let inArray = false;
  
  for (const line of lines) {
    // Remove ALL backticks and quotes
    const cleanLine = line.replace(/`/g, '').replace(/^["']|["']$/g, '').trim();
    if (!cleanLine) continue;
    
    if (cleanLine.startsWith('-') && inArray) {
      const value = cleanLine.slice(1).trim();
      // Only add non-empty values
      if (value && currentKey === 'tags' && Array.isArray(frontmatter.tags)) {
        frontmatter.tags.push(value);
      }
      continue;
    }
    
    if (cleanLine.includes(':')) {
      const colonIndex = cleanLine.indexOf(':');
      const key = cleanLine.slice(0, colonIndex).trim();
      let value = cleanLine.slice(colonIndex + 1).trim();
      
      currentKey = key;
      
      if (value === '' || value === '[]') {
        if (key === 'tags') {
          frontmatter.tags = [];
          inArray = true;
        }
      } else {
        inArray = false;
        // Strip ALL quotes, backticks, and whitespace
        value = value.replace(/["`']/g, '').trim();
        
        // Skip empty values
        if (!value) continue;
        
        if (key === 'reading_time_minutes') {
          frontmatter[key] = parseInt(value, 10);
        } else {
          frontmatter[key] = value;
        }
      }
    }
  }
  
  return frontmatter;
}

// Write to JSON file
const outputPath = path.join(__dirname, '../client/public/data/blog-posts.json');
fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));

console.log(`✅ Parsed ${posts.length} blog posts successfully!`);

// Validate data quality
let hasIssues = false;

posts.forEach((post, index) => {
  // Check for backticks in metadata or content
  if (post.slug?.includes('`') || post.title?.includes('`') || 
      post.meta_description?.includes('`') || post.content?.includes('`')) {
    console.error(`❌ Post ${index + 1} (${post.slug}) still has backticks`);
    hasIssues = true;
  }
  
  // Check for empty string tags
  if (post.tags?.some(tag => tag === '')) {
    console.error(`❌ Post ${index + 1} (${post.slug}) has empty tag strings`);
    hasIssues = true;
  }
  
  // Check for trailing quotes
  if (post.slug?.match(/["']$/) || post.title?.match(/["']$/)) {
    console.error(`❌ Post ${index + 1} (${post.slug}) has trailing quotes`);
    hasIssues = true;
  }
  
  // Check for merged words around tags (missing spaces)
  if (post.content?.match(/[a-z]<(em|strong|code)>/i) || 
      post.content?.match(/<\/(em|strong|code)>[a-z]/i)) {
    console.error(`❌ Post ${index + 1} (${post.slug}) has merged words around inline tags`);
    hasIssues = true;
  }
  
  // Check for excessive trailing whitespace in block elements
  if (post.content?.match(/\s{3,}<\/(li|p|h[1-6]|blockquote)>/)) {
    console.error(`❌ Post ${index + 1} (${post.slug}) has excessive trailing whitespace in block elements`);
    hasIssues = true;
  }
});

if (hasIssues) {
  console.error('\n❌ Data validation failed! Please review the output above.');
  process.exit(1);
} else {
  console.log('✅ All blog posts are clean and valid!');
  console.log(`📁 Output: ${outputPath}`);
}
