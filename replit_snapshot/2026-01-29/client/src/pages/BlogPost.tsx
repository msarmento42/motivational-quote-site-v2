import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { BlogPost as BlogPostType } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AuthorBio } from "@/components/AuthorBio";
import { Helmet } from "react-helmet-async";

const categories: {[key: string]: string} = {
  "discipline": "Discipline",
  "mindset": "Mindset",
  "motivation": "Motivation",
  "well-being": "Well-Being",
  "growth": "Growth",
  "relationships": "Relationships",
  "resilience": "Resilience",
  "productivity": "Productivity",
  "career": "Career",
  "health": "Health",
  "confidence": "Confidence",
  "transitions": "Transitions",
  "routines-goals": "Routines & Goals",
};

export default function BlogPost() {
  const [, params] = useRoute("/blog/:category/:slug");
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params?.category || !params?.slug) {
      setIsLoading(false);
      return;
    }

    fetch("/data/blog-posts.json")
      .then((res) => res.json())
      .then((data: BlogPostType[]) => {
        const foundPost = data.find(
          p => p.category === params.category && p.slug === params.slug
        );
        setPost(foundPost || null);
        setAllPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load blog post:", error);
        setIsLoading(false);
      });
  }, [params?.category, params?.slug]);

  // Calculate related posts based on category and tags
  const getRelatedPosts = (currentPost: BlogPostType): BlogPostType[] => {
    if (!currentPost) return [];

    return allPosts
      .filter(p => p.slug !== currentPost.slug) // Exclude current post
      .map(p => {
        let score = 0;
        
        // Same category = +10 points
        if (p.category === currentPost.category) {
          score += 10;
        }
        
        // Shared tags = +5 points per tag
        const sharedTags = p.tags.filter(tag => currentPost.tags.includes(tag));
        score += sharedTags.length * 5;
        
        return { post: p, score };
      })
      .filter(({ score }) => score > 0) // Only posts with some relevance
      .sort((a, b) => b.score - a.score) // Sort by relevance
      .slice(0, 3) // Take top 3
      .map(({ post }) => post);
  };

  const relatedPosts = post ? getRelatedPosts(post) : [];

  if (isLoading) {
    return (
      <Layout includeAdsense={true}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-muted-foreground">Loading article...</div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout includeAdsense={true}>
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${post.title} - Motivational Quotes`}
      description={post.meta_description}
      includeAdsense={true}
    >
      <Helmet>
        <meta name="keywords" content={post.tags.join(", ")} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.meta_description,
            "keywords": post.tags.join(", "),
            "datePublished": post.published_at,
            "author": {
              "@type": "Organization",
              "name": "Motivational Quotes"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Motivational Quotes",
              "url": "https://motivational-quote.org"
            }
          })}
        </script>
      </Helmet>

      <article className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-6" data-testid="button-back-to-blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" data-testid="badge-post-category">
                {categories[post.category] || post.category}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span data-testid="text-reading-time">{post.reading_time_minutes} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span data-testid="text-published-date">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground">
              {post.meta_description}
            </p>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            data-testid="article-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" data-testid={`tag-${tag}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12">
            <AuthorBio />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={`${relatedPost.category}/${relatedPost.slug}`}
                    href={`/blog/${relatedPost.category}/${relatedPost.slug}`}
                  >
                    <Card className="h-full hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-related-post-${relatedPost.slug}`}>
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2">
                          {categories[relatedPost.category] || relatedPost.category}
                        </Badge>
                        <CardTitle className="text-lg line-clamp-2">
                          {relatedPost.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {relatedPost.meta_description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{relatedPost.reading_time_minutes} min read</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <Link href="/blog">
              <Button data-testid="button-view-all">
                <ArrowLeft className="w-4 h-4 mr-2" />
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}
