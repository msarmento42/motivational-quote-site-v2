# Motivational Quote Site

This repository contains a simple static website that delivers unique motivational quotes and helpful information for visitors. The project is designed with Google AdSense approval guidelines in mind and includes the essential pages required for compliance.

## Features

- **Random quote generator:** Displays a unique motivational quote each time you load the page or click the “New Quote” button. Quotes are original or in the public domain to avoid copyright issues.
- **Clear navigation:** The site includes a navigation bar linking to the Home, About, Contact and Privacy Policy pages. This improves user experience, as recommended by AdSense guidelines【70520110573980†L65-L74】.
- **Essential pages:** Includes dedicated pages for About, Contact and Privacy Policy. Having these pages increases credibility and is important for AdSense approval【75987780379277†L153-L159】.

## Directory structure

```
motivational-quote-site/
│   README.md
│   index.html
│   about.html
│   contact.html
│   privacy.html
│   style.css
│   app.js
│   .gitignore
└── assets/
    └── (images go here)
```

## Development

No build tools are required. To work on the site locally:

1. Clone the repository or download the files.
2. Open `index.html` in your web browser to view the site.
3. Make edits to the HTML, CSS or JavaScript files as needed.
4. Commit and push your changes using Git. If you are using GitHub Desktop, ensure that the repository folder contains the `.git` directory so that Desktop can detect your changes.

## Deployment

Because this is a static site, it can be hosted on a variety of platforms (e.g., GitHub Pages, Netlify, Vercel). To deploy on GitHub Pages:

1. Create a new GitHub repository (do not initialize it with a README or .gitignore).
2. Push the contents of `motivational-quote-site` to your new repository.
3. In the repository settings, enable GitHub Pages and set the source branch to `main` (or the branch where your site lives).
4. After a few minutes, your site will be available at `https://<username>.github.io/<repository-name>/`.

## Adding Google AdSense

After your site meets all eligibility requirements (unique and interesting content, good navigation, essential pages, etc.), you can apply for AdSense. When you are approved, insert your AdSense script into the placeholder comment within `index.html`. Follow Google’s policies carefully to avoid any violations【70520110573980†L87-L103】.
