# Design Guidelines: Motivational Quotes Blog

## Design Approach

**System-Based Approach**: Clean, content-focused design optimized for long-form reading and AdSense monetization. Drawing from minimalist content platforms like Medium and Ghost, prioritizing typography hierarchy, readability, and comfortable whitespace over decorative elements.

**Core Principles**:
- Reading comfort for 1000+ word articles
- Clear content hierarchy and navigation
- AdSense-friendly layouts (no visual competition)
- Mobile-first responsive design
- Fast, distraction-free experience

---

## Typography System

**Font Stack**:
- **Headings**: System font stack (font-display: swap) - `font-sans` with `font-bold` or `font-semibold`
- **Body**: System font stack for optimal performance - `font-sans` with `font-normal`
- **Quotes**: Slightly larger, possibly italic treatment for emphasis

**Type Scale** (Tailwind classes):
- **H1 (Page Titles)**: `text-4xl md:text-5xl font-bold leading-tight`
- **H2 (Major Sections)**: `text-3xl md:text-4xl font-semibold leading-snug`
- **H3 (Subsections)**: `text-2xl md:text-3xl font-semibold`
- **Body Text**: `text-base md:text-lg leading-relaxed` (optimized line-height for readability)
- **Meta Info**: `text-sm text-gray-600`
- **Quote Display**: `text-2xl md:text-3xl italic leading-relaxed`

**Reading Optimization**:
- Blog post content: `max-w-3xl mx-auto` (optimal line length ~65-75 characters)
- Line height: `leading-relaxed` (1.625) for body text
- Paragraph spacing: `space-y-4` between paragraphs

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Component padding: `p-4 md:p-6`
- Section spacing: `py-12 md:py-20`
- Container gaps: `gap-8` or `gap-12`

**Container Strategy**:
- **Homepage/Blog Index**: `max-w-7xl mx-auto px-4`
- **Blog Posts**: `max-w-3xl mx-auto px-4` (narrower for reading)
- **Trust Pages**: `max-w-4xl mx-auto px-4`

**Grid Layouts**:
- Blog post cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Category filters: Horizontal scroll on mobile, full width on desktop

---

## Component Library

### Navigation Bar
- Fixed top navigation with `sticky top-0 z-50` with subtle shadow
- Desktop: Horizontal links (Home, Blog, About, Contact, Privacy)
- Mobile: Hamburger menu → slide-in drawer
- Height: `h-16` with centered content
- Logo/site name on left, navigation links on right

### Homepage Quote Generator
**Layout**: Hero section occupying ~60-70vh
- Centered vertically and horizontally
- Quote text: Large, centered, with generous padding
- Author attribution: Smaller, right-aligned or centered below quote
- "New Quote" button: Primary CTA button below attribution
- Background: Subtle gradient or single tone (no image needed)

**Quote Card Component**:
```
Container: max-w-4xl mx-auto p-8
Quote: text-2xl md:text-3xl italic text-center
Author: text-lg text-right mt-6
Button: Centered below, primary style
```

### Blog Index Page
**Category Navigation**: 
- Sticky horizontal scroll bar below main nav
- Pill-style category buttons: `rounded-full px-4 py-2` with active state

**Blog Card Grid**:
- Cards with subtle borders or shadows: `border rounded-lg p-6`
- Each card contains:
  - Category badge (small pill at top)
  - Title: `text-xl font-semibold`
  - Excerpt/meta description: `text-base line-clamp-3`
  - Reading time + date: `text-sm` at bottom
  - Hover: Subtle lift or border emphasis

### Blog Post Page
**Article Header**:
- Title: `text-4xl md:text-5xl font-bold mb-4`
- Meta row: Author, Date, Reading time (`text-sm space-x-4`)
- Category tags: Small pills `mb-8`

**Article Body**:
- Generous top padding: `pt-8`
- Headings stand out with `mt-12 mb-4` spacing
- Paragraph spacing: `mb-6`
- Lists: Proper indentation with `list-disc pl-6`
- Blockquotes: Left border with padding `border-l-4 pl-6 italic`

**Related Posts Section**:
- At article end: "Related Articles"
- 2-3 cards in horizontal layout (or stacked on mobile)

### Trust Pages (About, Contact, Privacy, Terms)
- Standard article layout with `max-w-4xl`
- Clear H1 at top
- Well-spaced sections with H2/H3 hierarchy
- Contact page: Simple mailto link or basic form layout

### Cookie Consent Banner
- Fixed bottom: `fixed bottom-0 left-0 right-0 z-50`
- Compact height with message + "Accept" button
- Dismiss option available
- Subtle shadow to separate from content

### Footer
- Three-column layout on desktop, stacked on mobile
- Column 1: Site name/tagline
- Column 2: Quick links (Blog categories, About, Contact)
- Column 3: Privacy/Terms links
- Copyright notice centered at bottom
- Total height: Modest `py-12`

---

## AdSense Integration Zones

**Placement Strategy** (Auto Ads handle specifics, but design accommodates):
- **Blog posts**: Clear space after 2-3 paragraphs for in-content ad
- **Blog index**: Space between card rows (every 6-9 posts)
- **Sidebar** (desktop only): Right rail on blog posts if layout permits
- Ads excluded from: Privacy, Terms, Contact, Cookie Disclosure, 404

**Layout Accommodation**:
- In-article ads: `my-8` spacing top/bottom, centered container
- Sidebar ads: `sticky top-20` with `space-y-8` if multiple units

---

## Responsive Breakpoints

- **Mobile**: Base styles (< 768px)
- **Tablet**: `md:` prefix (≥ 768px)
- **Desktop**: `lg:` prefix (≥ 1024px)

**Key Responsive Shifts**:
- Navigation: Hamburger → full nav at `md:`
- Blog grid: 1 col → 2 col at `md:` → 3 col at `lg:`
- Typography: Smaller sizes at base, larger at `md:`
- Spacing: `py-12` → `md:py-20` for sections

---

## Interaction & States

**Minimal Animations** (as specified):
- Navigation: Smooth slide-in for mobile menu (`transition-transform duration-300`)
- Buttons: Subtle hover scale or opacity change
- Cards: Gentle hover lift (`hover:shadow-lg transition-shadow`)
- Links: Underline on hover for body text links
- Quote generator: Fade transition when new quote loads

**No Animations**:
- No parallax effects
- No scroll-triggered animations
- No complex transitions that could interfere with ads

---

## Accessibility

- Semantic HTML throughout (`<nav>`, `<article>`, `<aside>`)
- ARIA labels for navigation and interactive elements
- Focus states visible on all interactive elements
- Sufficient contrast for all text (WCAG AA minimum)
- Skip-to-content link for keyboard users

---

## Performance Considerations

- System fonts only (no web font loading)
- Lazy loading for blog post images (if any added later)
- Minimal JavaScript (quote generator only)
- AdSense script async loading
- Critical CSS inlined for above-fold content

---

## Key Design Distinctions

**This is NOT**:
- A visually loud, image-heavy inspirational site
- A minimalist art portfolio
- A magazine-style publication

**This IS**:
- A content-first reading platform
- Clear, scannable blog organization
- Functional quote inspiration tool
- AdSense-optimized monetization vehicle