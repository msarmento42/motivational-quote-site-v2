import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("cookie-consent", "dismissed");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-card-border shadow-lg" data-testid="banner-cookie-consent">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-foreground">
              We use cookies to improve your experience and for analytics. By using this site, you consent to our use of cookies for ads and analytics.{" "}
              <a href="/cookie-disclosure" className="underline hover:text-primary" data-testid="link-cookie-learn-more">
                Learn more
              </a>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleAccept} size="sm" data-testid="button-cookie-accept">
              Accept
            </Button>
            <Button onClick={handleDismiss} variant="ghost" size="sm" data-testid="button-cookie-dismiss">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
