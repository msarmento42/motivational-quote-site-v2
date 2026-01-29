import { Layout } from "@/components/Layout";
import { QuoteGenerator } from "@/components/QuoteGenerator";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Book, Heart, Target } from "lucide-react";

export default function Home() {
  return (
    <Layout
      title="Motivational Quotes - Daily Wisdom & Inspiration for Personal Growth"
      description="Discover 200 timeless motivational quotes and 80 in-depth articles on discipline, mindset, resilience, productivity, and personal development. Start your journey to a better you today."
    >
      {/* Hero Section with Quote Generator */}
      <section>
        <QuoteGenerator />
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Welcome to Motivational Quotes
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            Discover timeless wisdom and practical advice from ancient philosophers, 
            modern thinkers, and inspiring leaders. Our curated collection of public-domain 
            quotes and in-depth articles will help you build discipline, cultivate a growth 
            mindset, and live with purpose.
          </p>
          <Link href="/blog">
            <Button size="lg" data-testid="button-explore-blog">
              Explore Our Blog
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Book className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">In-Depth Articles</h3>
              <p className="text-muted-foreground">
                Long-form content on discipline, mindset, motivation, and personal growth 
                with actionable strategies you can apply today.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Public Domain Wisdom</h3>
              <p className="text-muted-foreground">
                All quotes are from public domain sources, ensuring authentic wisdom 
                from verified philosophical and literary works.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Practical Focus</h3>
              <p className="text-muted-foreground">
                No fluff, just actionable advice and clear examples to help you 
                overcome procrastination, build habits, and achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>
    </Layout>
  );
}
