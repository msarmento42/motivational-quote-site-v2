import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  includeAdsense?: boolean;
}

export function Layout({ 
  children, 
  title = "Motivational Quotes - Daily Wisdom & Inspiration",
  description = "Discover timeless wisdom and practical advice for personal growth, discipline, and motivation through curated quotes and in-depth articles.",
  includeAdsense = true,
}: LayoutProps) {
  const [location] = useLocation();
  const canonicalUrl = `https://motivational-quote.org${location}`;
  const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
  
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {googleVerification && (
          <meta name="google-site-verification" content={googleVerification} />
        )}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {includeAdsense && (
          <script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6175161566333696"
            crossOrigin="anonymous"
          />
        )}
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
