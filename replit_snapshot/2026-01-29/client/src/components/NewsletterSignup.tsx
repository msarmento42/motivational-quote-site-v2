import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call (in production, this would send to your email service)
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail("");
      
      toast({
        title: "Success!",
        description: "You've been added to our newsletter. Check your email for confirmation.",
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <Card data-testid="card-newsletter-success">
        <CardContent className="pt-6">
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Thanks for subscribing!</h3>
            <p className="text-sm text-muted-foreground">
              Check your inbox for a confirmation email.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="card-newsletter-signup">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-5 h-5 text-primary" />
          <CardTitle className="text-xl">Stay Inspired</CardTitle>
        </div>
        <CardDescription>
          Get our latest articles and motivational quotes delivered to your inbox weekly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-testid="input-newsletter-email"
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            data-testid="button-newsletter-submit"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  );
}
