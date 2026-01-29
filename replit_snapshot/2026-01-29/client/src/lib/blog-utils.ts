import { BlogPost, BlogPostFrontmatter, Category } from "@shared/schema";

// Parse markdown frontmatter and content
export function parseBlogPost(rawContent: string, category: string): BlogPost | null {
  try {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = rawContent.match(frontmatterRegex);
    
    if (!match) {
      console.error("Failed to parse blog post frontmatter");
      return null;
    }

    const [, frontmatterStr, content] = match;
    
    // Parse YAML-like frontmatter manually
    const frontmatter: Partial<BlogPostFrontmatter> = {};
    const lines = frontmatterStr.split('\n');
    
    let currentKey = '';
    let inArray = false;
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Handle array items
      if (trimmed.startsWith('-') && inArray) {
        const value = trimmed.slice(1).trim();
        if (currentKey === 'tags' && Array.isArray(frontmatter.tags)) {
          frontmatter.tags.push(value);
        }
        continue;
      }
      
      // Handle key-value pairs
      if (trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':');
        const key = trimmed.slice(0, colonIndex).trim();
        const value = trimmed.slice(colonIndex + 1).trim();
        
        currentKey = key;
        
        if (value === '' || value === '[]') {
          // Empty value or array
          if (key === 'tags') {
            frontmatter.tags = [];
            inArray = true;
          }
        } else {
          // Has value
          inArray = false;
          const cleanValue = value.replace(/^["']|["']$/g, '');
          
          if (key === 'reading_time_minutes') {
            frontmatter[key] = parseInt(cleanValue, 10);
          } else {
            (frontmatter as any)[key] = cleanValue;
          }
        }
      }
    }

    return {
      ...(frontmatter as BlogPostFrontmatter),
      content: content.trim(),
      category,
    };
  } catch (error) {
    console.error("Error parsing blog post:", error);
    return null;
  }
}

// Convert markdown to HTML (simple implementation)
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Lists (simple)
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr />');

  // Paragraphs (split by double newlines)
  const paragraphs = html.split('\n\n').map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<hr')) {
      return trimmed;
    }
    return `<p>${trimmed}</p>`;
  }).filter(p => p);

  return paragraphs.join('\n');
}
