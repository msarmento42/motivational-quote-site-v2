import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/blog", label: "Blog" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Site Name */}
          <Link href="/" className="font-bold text-xl hover-elevate active-elevate-2 rounded-md px-3 py-2">
            <span data-testid="text-site-name">Motivational Quotes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label }) => (
              <Link key={path} href={path}>
                <Button
                  variant={isActive(path) ? "secondary" : "ghost"}
                  data-testid={`link-nav-${label.toLowerCase()}`}
                >
                  {label}
                </Button>
              </Link>
            ))}
            <Link href="/privacy">
              <Button variant="ghost" data-testid="link-nav-privacy">
                Privacy
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map(({ path, label }) => (
                <Link key={path} href={path}>
                  <Button
                    variant={isActive(path) ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-nav-${label.toLowerCase()}`}
                  >
                    {label}
                  </Button>
                </Link>
              ))}
              <Link href="/privacy">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-mobile-nav-privacy"
                >
                  Privacy
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
