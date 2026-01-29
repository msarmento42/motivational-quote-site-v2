import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <Layout
      title="404 - Page Not Found"
      description="The page you're looking for doesn't exist."
      includeAdsense={false}
    >
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <Button size="lg" data-testid="button-home">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/blog">
            <Button size="lg" variant="outline" data-testid="button-blog">
              <Search className="w-5 h-5 mr-2" />
              Browse Blog
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
