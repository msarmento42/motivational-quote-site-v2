import { Layout } from "@/components/Layout";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { BlogPost, Category } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Clock, Calendar, Search, X } from "lucide-react";

const categories: {value: string, label: string}[] = [
  { value: "discipline", label: "Discipline" },
  { value: "mindset", label: "Mindset" },
  { value: "motivation", label: "Motivation" },
  { value: "well-being", label: "Well-Being" },
  { value: "growth", label: "Growth" },
  { value: "relationships", label: "Relationships" },
  { value: "resilience", label: "Resilience" },
  { value: "productivity", label: "Productivity" },
  { value: "career", label: "Career" },
  { value: "health", label: "Health" },
  { value: "confidence", label: "Confidence" },
  { value: "transitions", label: "Transitions" },
  { value: "routines-goals", label: "Routines & Goals" },
];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/data/blog-posts.json")
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load blog posts:", error);
        setIsLoading(false);
      });
  }, []);

  // Filter by category first
  let filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);
  
  // Then filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.meta_description.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return (
    <Layout
      title="Blog - Motivational Quotes"
      description="Explore in-depth articles on discipline, mindset, motivation, well-being, personal growth, and relationships."
    >
      {/* Header */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Practical advice and actionable strategies for personal growth, productivity, 
            and living with purpose.
          </p>
        </div>
      </section>

      {/* Search and Category Filter */}
      <section className="sticky top-16 z-40 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles by keyword or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              data-testid="input-search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                data-testid="button-clear-search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2" data-testid="category-filter">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="whitespace-nowrap"
              data-testid="button-category-all"
            >
              All Posts ({posts.length})
            </Button>
            {categories.map((cat) => {
              const count = posts.filter(p => p.category === cat.value).length;
              if (count === 0) return null;
              
              return (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.value)}
                  className="whitespace-nowrap"
                  data-testid={`button-category-${cat.value}`}
                >
                  {cat.label} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading articles...</div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? `No posts found matching "${searchQuery}"` : "No posts found in this category."}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                  className="mt-4"
                  data-testid="button-clear-search-results"
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={`${post.category}/${post.slug}`} href={`/blog/${post.category}/${post.slug}`}>
                  <Card className="h-full hover-elevate active-elevate-2 transition-shadow cursor-pointer" data-testid={`card-post-${post.slug}`}>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" data-testid={`badge-category-${post.category}`}>
                          {categories.find(c => c.value === post.category)?.label || post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-semibold line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.meta_description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.reading_time_minutes} min read</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.published_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
          
          {/* Newsletter Signup */}
          {!isLoading && filteredPosts.length > 0 && (
            <div className="mt-16 max-w-2xl mx-auto">
              <NewsletterSignup />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
