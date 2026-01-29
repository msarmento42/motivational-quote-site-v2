# Motivational Quotes Website

## Overview

A modern, SEO-optimized content website featuring 200 curated public-domain motivational quotes and 79 in-depth blog articles on personal development topics. The site is built as a static-first application with React, focusing on fast performance, excellent SEO, and monetization through Google AdSense while maintaining GDPR compliance.

The application serves philosophical wisdom and practical advice through a clean, content-focused design optimized for long-form reading. All quotes are verified public-domain sources (pre-1929 publications or authors who died before 1955), ensuring legal compliance and authentic attribution.

## Recent Updates (November 2025)

Added five content engagement features to enhance user experience and SEO:

1. **Blog Search** - Full-text search across titles, descriptions, and tags with real-time filtering and clear button
2. **Related Posts** - Intelligent article recommendations using category/tag similarity scoring (3-4 suggestions per post)
3. **RSS Feed** - XML feed with latest 20 articles, auto-discovery link tag, and footer link for subscribers
4. **Author Bio** - Team information section on every blog post with contact link
5. **Newsletter Signup** - Email subscription form on Home and Blog pages with validation and success states (ready for email service integration)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type safety and modern component patterns
- Vite as the build tool for fast development and optimized production builds
- Static site generation approach - all content pre-rendered as JSON files consumed by the client

**Routing:**
- Wouter (lightweight React router) for client-side navigation
- Route structure: Home (`/`), Blog index (`/blog`), Blog posts (`/blog/:category/:slug`), and trust pages (about, privacy, terms, etc.)

**UI Component System:**
- shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- "New York" style variant with neutral base color scheme
- System font stack for optimal performance and reading comfort

**State Management:**
- TanStack Query (React Query) for data fetching and caching
- Local component state with React hooks
- No complex global state - content is static and loaded from JSON files

**Content Architecture:**
- Blog posts stored as pre-parsed JSON (`/client/public/data/blog-posts.json`) containing frontmatter metadata and rendered HTML content
- Quotes stored as JSON array (`/client/public/data/quotes.json`) with text and author attribution
- Markdown content converted to HTML during build process via Node.js scripts
- Client consumes fully-rendered content - no runtime markdown parsing

### Backend Architecture

**Server Framework:**
- Express.js server with separate development and production entry points
- Development mode uses Vite middleware for HMR and fast refresh
- Production mode serves pre-built static assets from `dist/public`

**Database & ORM:**
- Drizzle ORM configured for PostgreSQL (via Neon serverless)
- Schema defined in shared folder but currently unused (placeholder for future features like newsletter subscriptions)
- In-memory storage implementation for basic user management (not actively used)

**API Structure:**
- Minimal API surface - most content served statically
- `/api/*` route prefix reserved for future dynamic features
- Storage interface abstraction allows swapping between memory and database implementations

### SEO & Analytics Implementation

**Meta Tags & Social Sharing:**
- React Helmet Async for dynamic meta tag management
- Open Graph and Twitter Card tags on all pages
- Canonical URLs to prevent duplicate content issues
- JSON-LD structured data (implemented via Layout component)

**Sitemap & Crawling:**
- Dynamic sitemap generation script (`scripts/generate-sitemap.js`)
- Sitemap includes all static pages and blog posts with appropriate priorities
- `robots.txt` allows all crawlers and references sitemap
- RSS feed (`/rss.xml`) generated via `scripts/generate-rss.js` with latest 20 articles
- RSS auto-discovery link tag in HTML head and footer link for subscribers

**Analytics:**
- Google Analytics 4 (G-083MSQKPFX) tracking script in base HTML
- Cookie consent banner for GDPR compliance
- Consent stored in localStorage to avoid repeated prompts

### Monetization Strategy

**Google AdSense Integration:**
- Auto Ads only (publisher ID: ca-pub-6175161566333696)
- Script excluded from trust pages (privacy, terms, contact, etc.)
- `ads.txt` file for publisher verification
- AdSense script loaded with async and preconnect for performance

**Content Strategy:**
- Long-form articles (1000+ words) optimized for ad placement
- Reading-optimized typography (max-width containers, relaxed line heights)
- Clean layouts that don't compete with ad units visually

### Build & Deployment Pipeline

**Build Process:**
1. Parse markdown blog posts to JSON (`scripts/parse-blog-posts.js`) - validates and removes duplicates
2. Generate sitemap (`scripts/generate-sitemap.js`)
3. Generate RSS feed (`scripts/generate-rss.js`)
4. Vite builds React app to `dist/public`
5. esbuild bundles server code to `dist/index.js`

**Scripts:**
- `dev`: Development server with Vite HMR
- `build`: Full production build (client + server)
- `start`: Run production server
- `db:push`: Push Drizzle schema to database (for future use)

**Deployment Target:**
- Netlify (as indicated in README)
- Static files served via CDN
- Server for any future dynamic features

### Content Management

**Blog Post Structure:**
- 79 unique blog posts with frontmatter: title, slug, meta_description, primary_keyword, tags, published_at, reading_time_minutes
- Categories: discipline, mindset, motivation, well-being, growth, relationships, resilience, productivity, career, health, confidence, transitions, routines-goals
- Posts organized by category in URL structure for SEO
- Each post includes author bio, related post suggestions, and social sharing metadata

**Blog Features:**
- **Search functionality**: Real-time filtering across title, description, and tags with clear/reset button
- **Related posts**: Algorithm scores posts by category match (10 points) + shared tags (5 points each), displays top 3-4 suggestions
- **Author bio**: Team information card with contact link on every post
- **Newsletter integration**: Email signup form for building subscriber list (UI ready for email service connection)

**Quote Management:**
- 200 quotes from verified public-domain sources
- Each quote includes text and author attribution
- Authors: Marcus Aurelius, Epictetus, Seneca, Emerson, Thoreau, Shakespeare, and other classical figures
- Random quote generator on homepage

### Design System

**Typography:**
- Headings: Bold system fonts (text-4xl to text-5xl for H1)
- Body: text-base to text-lg with leading-relaxed for readability
- Quote display: text-2xl to text-3xl with italic treatment
- Optimized line length: max-w-3xl for blog posts (~65-75 characters)

**Spacing & Layout:**
- Tailwind spacing units: 4, 6, 8, 12, 16, 20, 24 for consistency
- Container widths: max-w-7xl for index pages, max-w-3xl for reading pages
- Mobile-first responsive design with md: breakpoint at 768px

**Color System:**
- CSS variables for theming (light mode default)
- Primary color: HSL(221, 83%, 53%) - blue accent
- Neutral base colors for backgrounds and borders
- Custom shadow system for depth

## External Dependencies

### Third-Party Services

**Google Services:**
- Google Analytics 4 (measurement ID: G-083MSQKPFX)
- Google AdSense (publisher ID: pub-6175161566333696)
- Preconnect to `pagead2.googlesyndication.com` for faster ad loading

**Domain & Hosting:**
- Domain: motivational-quote.org
- Hosting: Netlify (inferred from README)
- Contact email: contact@motivational-quote.org
- Privacy email: privacy@motivational-quote.org

### NPM Packages

**Core Framework:**
- React 18 with TypeScript
- Vite for build tooling
- Express for server
- Wouter for routing

**UI & Styling:**
- Tailwind CSS
- shadcn/ui component library
- Radix UI primitives (@radix-ui/react-*)
- class-variance-authority for component variants
- Lucide React for icons

**Data & State:**
- TanStack Query (@tanstack/react-query)
- Drizzle ORM with PostgreSQL dialect
- Neon serverless database client (@neondatabase/serverless)
- Zod for schema validation

**SEO & Metadata:**
- react-helmet-async for head management
- marked for markdown parsing (build-time)
- RSS feed generation (custom script)

**Development Tools:**
- TypeScript compiler
- esbuild for server bundling
- drizzle-kit for database migrations
- Replit plugins for development experience

### Database

**Provider:** Neon (serverless PostgreSQL)
- Connection via `DATABASE_URL` environment variable
- Drizzle ORM for type-safe queries
- Schema defined but minimal usage (prepared for future features)
- Currently using in-memory storage for development