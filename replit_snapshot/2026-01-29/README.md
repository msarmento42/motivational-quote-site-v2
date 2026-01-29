# Motivational Quotes Website

A modern, fast, and SEO-optimized website featuring 200 public-domain motivational quotes and 80 in-depth blog articles on personal growth, discipline, productivity, and more.

## 🌟 Features

- **Random Quote Generator**: 200 carefully curated public-domain quotes from philosophers, authors, and historical figures
- **80 Blog Articles**: In-depth, actionable content organized by category:
  - Discipline (10 posts)
  - Mindset (11 posts)
  - Resilience (14 posts)
  - Productivity (10 posts)
  - Career (10 posts)
  - Health, Confidence, Relationships, and more (25+ posts)
- **Full SEO Implementation**: Meta tags, Open Graph, JSON-LD, sitemap.xml
- **Google AdSense Integration**: Monetization with Auto Ads (ca-pub-6175161566333696)
- **Google Analytics 4**: Traffic tracking (G-083MSQKPFX)
- **GDPR Cookie Consent**: Compliant cookie banner
- **Trust Pages**: About, Contact, Privacy Policy, Terms, Cookie Disclosure, Editorial Policy, Attribution
- **Responsive Design**: Mobile-first, clean layout optimized for readability
- **Fast Performance**: Static generation, optimized assets

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: Wouter (lightweight React router)
- **SEO**: React Helmet Async
- **Markdown**: Marked (for blog content)
- **Deployment**: Netlify

## 📁 Project Structure

```
├── client/
│   ├── public/
│   │   ├── data/
│   │   │   ├── quotes.json         # 200 quotes
│   │   │   └── blog-posts.json     # 80 parsed blog posts
│   │   ├── sitemap.xml
│   │   ├── robots.txt
│   │   └── ads.txt
│   └── src/
│       ├── components/             # Reusable components
│       ├── pages/                  # Page components
│       └── lib/                    # Utilities
├── scripts/
│   ├── parse-blog-posts.js         # Parse markdown to JSON
│   └── generate-sitemap.js         # Generate sitemap.xml
├── shared/
│   └── schema.ts                   # TypeScript schemas
└── attached_assets/                # Source content files
```

## 🚀 Local Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5000`

### Building for Production

```bash
npm run build
```

Build output will be in `client/dist/`

## 📦 Deployment to Netlify

### Option 1: Deploy from GitHub (Recommended)

1. Push your code to GitHub repository `motivational-quote-site-v2`

2. Connect to Netlify:
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select `motivational-quote-site-v2` repository

3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `client/dist`
   - Node version: 20

4. Deploy!

### Option 2: Manual Deploy

```bash
# Build the site
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=client/dist
```

## 📝 Content Management

### Adding/Updating Quotes

Edit `client/public/data/quotes.json`:
```json
{
  "text": "Your quote text here",
  "author": "Author Name"
}
```

### Regenerating Blog Posts

If you update the source markdown file:
```bash
node scripts/parse-blog-posts.js
```

### Regenerating Sitemap

After adding new pages or posts:
```bash
node scripts/generate-sitemap.js
```

## 🔧 Configuration

### Google Search Console Verification

1. Create a `.env` file in the project root (copy from `.env.example`)
2. Get your verification code from [Google Search Console](https://search.google.com/search-console)
3. Add it to your `.env` file:
```
VITE_GOOGLE_SITE_VERIFICATION=your_verification_code_here
```

For Netlify deployment, add this as an environment variable in your site settings.

### Google Analytics

The Measurement ID (G-083MSQKPFX) is already configured in `client/index.html`.

### Google AdSense

Publisher ID (ca-pub-6175161566333696) is set in:
- `client/src/components/Layout.tsx`
- `client/public/ads.txt`

### Domain

Update the domain in:
- `scripts/generate-sitemap.js` (baseUrl)
- `client/public/robots.txt` (Sitemap URL)
- All canonical URLs in Layout component

## 📊 SEO Features

- ✅ Unique title and meta description for every page
- ✅ Open Graph tags for social sharing
- ✅ JSON-LD structured data for articles
- ✅ Sitemap.xml with all pages (89 URLs)
- ✅ Robots.txt
- ✅ Ads.txt for AdSense
- ✅ Canonical URLs
- ✅ Google Search Console verification meta tag
- ✅ Responsive meta viewport

## 🔐 Privacy & Legal

All required legal pages are included:
- Privacy Policy
- Terms of Use
- Cookie Disclosure
- Editorial Policy
- Attribution (quote sources)

## 📈 Google Search Console Setup

1. Add your site to Google Search Console
2. Add the verification meta tag to `client/index.html`
3. Submit sitemap: `https://motivational-quote.org/sitemap.xml`

## 📄 License

All quotes are from verified public-domain sources. Blog content is original.

## 🤝 Support

For questions or issues, contact: contact@motivational-quote.org

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
