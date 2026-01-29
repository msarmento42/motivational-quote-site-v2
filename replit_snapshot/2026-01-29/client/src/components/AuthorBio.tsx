import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export function AuthorBio() {
  return (
    <Card data-testid="card-author-bio">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-primary">MQ</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1" data-testid="text-author-name">
              Motivational Quotes Team
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              We're dedicated to providing timeless wisdom and practical advice for personal growth, 
              discipline, and motivation. Our content combines insights from classical philosophy 
              with modern psychology and productivity research.
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              data-testid="link-author-contact"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
