import { Link } from "wouter";
import { Rss } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-card-border py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Site Name & Tagline */}
          <div>
            <h3 className="font-bold text-lg mb-2" data-testid="text-footer-sitename">
              Motivational Quotes
            </h3>
            <p className="text-sm text-muted-foreground">
              Timeless wisdom for personal growth and inspiration
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-blog">
                Blog
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                About
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                Contact
              </Link>
              <a href="/rss.xml" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-footer-rss">
                <Rss className="w-4 h-4" />
                RSS Feed
              </a>
            </div>
          </div>

          {/* Column 3: Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
                Terms of Use
              </Link>
              <Link href="/cookie-disclosure" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-cookie">
                Cookie Disclosure
              </Link>
              <Link href="/editorial-policy" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-editorial">
                Editorial Policy
              </Link>
              <Link href="/attribution" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-attribution">
                Attribution
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p data-testid="text-copyright">
            © {currentYear} Motivational Quotes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
