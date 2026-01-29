import { useState, useEffect } from "react";
import { Quote } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/data/quotes.json")
      .then((res) => res.json())
      .then((data: Quote[]) => {
        setQuotes(data);
        setQuote(data[Math.floor(Math.random() * data.length)]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load quotes:", error);
        setIsLoading(false);
      });
  }, []);

  const getNewQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading quotes...</div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-muted-foreground">No quotes available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto text-center">
        <blockquote className="mb-6">
          <p className="text-2xl md:text-3xl lg:text-4xl italic leading-relaxed text-foreground" data-testid="text-quote">
            "{quote.text}"
          </p>
        </blockquote>
        
        <cite className="block text-lg md:text-xl text-muted-foreground mb-8 not-italic" data-testid="text-quote-author">
          — {quote.author}
        </cite>
        
        <Button
          onClick={getNewQuote}
          size="lg"
          className="gap-2"
          data-testid="button-new-quote"
        >
          <RefreshCw className="w-4 h-4" />
          New Quote
        </Button>
      </div>
    </div>
  );
}
