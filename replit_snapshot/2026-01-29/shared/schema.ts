import { z } from "zod";

// Quote schema
export const quoteSchema = z.object({
  text: z.string(),
  author: z.string(),
});

export type Quote = z.infer<typeof quoteSchema>;

// Blog post frontmatter schema
export const blogPostFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  meta_description: z.string(),
  primary_keyword: z.string(),
  tags: z.array(z.string()),
  published_at: z.string(),
  reading_time_minutes: z.number(),
});

export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>;

// Blog post with content
export interface BlogPost extends BlogPostFrontmatter {
  content: string;
  category: string;
}

// Category type
export const categories = [
  "discipline",
  "mindset",
  "motivation",
  "well-being",
  "growth",
  "relationships",
] as const;

export type Category = (typeof categories)[number];

export const categoryLabels: Record<Category, string> = {
  discipline: "Discipline",
  mindset: "Mindset",
  motivation: "Motivation",
  "well-being": "Well-Being",
  growth: "Growth",
  relationships: "Relationships",
};
