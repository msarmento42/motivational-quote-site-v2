import { Layout } from "@/components/Layout";

export default function Terms() {
  return (
    <Layout
      title="Terms of Use - Motivational Quotes"
      description="Read our terms and conditions for using this website."
      includeAdsense={false}
    >
      <article className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>Terms of Use</h1>
          
          <p className="text-sm text-muted-foreground">
            <strong>Last Updated:</strong> January 2025
          </p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using motivational-quote.org (the "Site"), you accept and 
            agree to be bound by the terms and conditions of this agreement. If you do 
            not agree to these terms, please do not use the Site.
          </p>

          <h2>Use of Content</h2>
          
          <h3>Public Domain Quotes</h3>
          <p>
            All quotes featured on this Site are from verified public-domain sources. 
            These quotes may be freely used by anyone, subject to the original work's 
            public domain status.
          </p>

          <h3>Original Articles</h3>
          <p>
            The articles, blog posts, and other written content on this Site are owned 
            by Motivational Quotes or licensed to us. You may:
          </p>
          <ul>
            <li>Read and share links to our content</li>
            <li>Quote brief excerpts with proper attribution</li>
            <li>Print articles for personal, non-commercial use</li>
          </ul>
          <p>
            You may not:
          </p>
          <ul>
            <li>Reproduce, republish, or distribute our content in whole without permission</li>
            <li>Use our content for commercial purposes without authorization</li>
            <li>Modify or create derivative works from our content without consent</li>
          </ul>

          <h2>User Conduct</h2>
          <p>
            When using our Site, you agree to:
          </p>
          <ul>
            <li>Use the Site lawfully and respectfully</li>
            <li>Not attempt to disrupt or harm the Site's operation</li>
            <li>Not engage in any automated or systematic data collection (scraping) without permission</li>
            <li>Not submit false, misleading, or inappropriate content through any contact forms</li>
          </ul>

          <h2>Disclaimer of Warranties</h2>
          <p>
            The Site and its content are provided "as is" without warranties of any kind, 
            either express or implied. We do not guarantee:
          </p>
          <ul>
            <li>The accuracy, completeness, or timeliness of content</li>
            <li>That the Site will be uninterrupted or error-free</li>
            <li>That defects will be corrected</li>
            <li>That the Site is free of viruses or harmful components</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Motivational Quotes shall not be 
            liable for any indirect, incidental, special, consequential, or punitive 
            damages resulting from your use of or inability to use the Site.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our Site may contain links to third-party websites or resources. We are not 
            responsible for the content, accuracy, or practices of these external sites. 
            Accessing third-party links is at your own risk.
          </p>

          <h2>Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. Changes will 
            be effective immediately upon posting to the Site. Your continued use of the 
            Site after changes constitutes acceptance of the modified terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance with 
            applicable laws, without regard to conflict of law principles.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have questions about these Terms of Use, please contact us at{" "}
            <a href="mailto:contact@motivational-quote.org">contact@motivational-quote.org</a>.
          </p>
        </div>
      </article>
    </Layout>
  );
}
