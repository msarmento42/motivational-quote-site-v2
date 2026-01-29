import { Layout } from "@/components/Layout";

export default function EditorialPolicy() {
  return (
    <Layout
      title="Editorial Policy - Motivational Quotes"
      description="Learn about our content standards and commitment to quality."
      includeAdsense={false}
    >
      <article className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>Editorial Policy</h1>

          <h2>Our Commitment to Quality Content</h2>
          <p>
            At Motivational Quotes, we are dedicated to providing high-quality, original, 
            and actionable content that genuinely helps our readers grow and improve their 
            lives. This Editorial Policy outlines our standards for content creation, fact-checking, 
            and transparency.
          </p>

          <h2>Content Standards</h2>
          
          <h3>Original Content</h3>
          <p>
            All articles published on our Site are original works created by our editorial 
            team or authorized contributors. We do not plagiarize, copy, or republish content 
            from other sources without proper attribution and permission.
          </p>

          <h3>People-First Approach</h3>
          <p>
            Our content is written for real people, not search engines. We focus on:
          </p>
          <ul>
            <li>Practical advice you can apply immediately</li>
            <li>Clear explanations without unnecessary jargon</li>
            <li>Honest, evidence-based recommendations</li>
            <li>Actionable steps and concrete examples</li>
          </ul>

          <h3>No Fluff Policy</h3>
          <p>
            We avoid filler content and generic advice. Every article aims to provide 
            genuine value, specific strategies, and clear takeaways that readers can 
            use to improve their lives.
          </p>

          <h2>Public Domain Quote Policy</h2>
          
          <h3>Verification</h3>
          <p>
            All quotes featured on our Site are sourced from verified public-domain works, 
            primarily from authors who died before 1955 or whose works have entered the 
            public domain under U.S. copyright law. We reference authoritative sources such as:
          </p>
          <ul>
            <li>Duke University's Public Domain Day announcements</li>
            <li>Stanford Copyright and Fair Use Center</li>
            <li>Published editions of classic philosophical and literary works</li>
          </ul>

          <h3>Attribution</h3>
          <p>
            Every quote is properly attributed to its author. We strive for accuracy in 
            attribution and welcome corrections if an error is identified.
          </p>

          <h2>Fact-Checking Process</h2>
          <p>
            We take accuracy seriously. Our fact-checking process includes:
          </p>
          <ul>
            <li>Verifying claims with credible, authoritative sources</li>
            <li>Cross-referencing information across multiple reliable references</li>
            <li>Consulting primary sources whenever possible</li>
            <li>Correcting errors promptly when brought to our attention</li>
          </ul>

          <h2>Corrections Policy</h2>
          <p>
            If you find an error, misattributed quote, or inaccurate information on our 
            Site, please contact us at{" "}
            <a href="mailto:contact@motivational-quote.org">contact@motivational-quote.org</a>. 
            We will investigate and, if necessary, issue a correction or update the content 
            accordingly.
          </p>

          <h2>Transparency</h2>
          
          <h3>Advertising Disclosure</h3>
          <p>
            Our Site is monetized through Google AdSense. We maintain editorial independence, 
            and advertisements do not influence our content or recommendations.
          </p>

          <h3>Affiliate Links</h3>
          <p>
            We do not currently use affiliate links. If this changes in the future, we will 
            clearly disclose any affiliate relationships in accordance with FTC guidelines.
          </p>

          <h2>Content Updates</h2>
          <p>
            We periodically review and update our content to ensure accuracy and relevance. 
            Significant updates are noted at the top of the article with a "Last Updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            For questions about our editorial standards or to report an issue, please 
            contact us at{" "}
            <a href="mailto:contact@motivational-quote.org">contact@motivational-quote.org</a>.
          </p>
        </div>
      </article>
    </Layout>
  );
}
