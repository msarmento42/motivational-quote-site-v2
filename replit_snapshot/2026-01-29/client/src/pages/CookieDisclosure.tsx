import { Layout } from "@/components/Layout";

export default function CookieDisclosure() {
  return (
    <Layout
      title="Cookie Disclosure - Motivational Quotes"
      description="Learn about how we use cookies on our website."
      includeAdsense={false}
    >
      <article className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>Cookie Disclosure</h1>
          
          <p className="text-sm text-muted-foreground">
            <strong>Last Updated:</strong> January 2025
          </p>

          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device (computer, tablet, 
            or mobile phone) when you visit a website. They help websites remember your 
            preferences and improve your browsing experience.
          </p>

          <h2>How We Use Cookies</h2>
          <p>
            At Motivational Quotes, we use cookies to:
          </p>
          <ul>
            <li>
              <strong>Remember Your Preferences</strong>: Store your cookie consent choice 
              so we don't repeatedly show you the consent banner.
            </li>
            <li>
              <strong>Analyze Site Traffic</strong>: Understand how visitors use our Site 
              through Google Analytics, helping us improve content and user experience.
            </li>
            <li>
              <strong>Serve Relevant Ads</strong>: Display advertisements through Google 
              AdSense that may be tailored to your interests based on your browsing history.
            </li>
          </ul>

          <h2>Types of Cookies We Use</h2>
          
          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the basic functioning of our Site, such as 
            remembering your cookie consent preference.
          </p>

          <h3>Analytics Cookies</h3>
          <p>
            We use Google Analytics to collect anonymous information about how visitors 
            interact with our Site. These cookies help us understand which pages are most 
            popular, how long visitors stay, and what content is most engaging.
          </p>

          <h3>Advertising Cookies</h3>
          <p>
            Google AdSense uses cookies to deliver ads and measure ad performance. These 
            cookies may track your browsing behavior across multiple sites to show you 
            relevant advertisements.
          </p>

          <h2>Managing Cookies</h2>
          
          <h3>Browser Settings</h3>
          <p>
            You can control and manage cookies through your browser settings. Most browsers 
            allow you to:
          </p>
          <ul>
            <li>View and delete cookies</li>
            <li>Block cookies from specific sites</li>
            <li>Block all third-party cookies</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>

          <h3>Opt-Out Tools</h3>
          <p>
            For more control over advertising cookies, you can:
          </p>
          <ul>
            <li>
              Visit{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>{" "}
              to opt out of personalized ads
            </li>
            <li>
              Use the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                Google Analytics Opt-out Browser Add-on
              </a>{" "}
              to prevent Google Analytics from tracking your activity
            </li>
            <li>
              Visit{" "}
              <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
                www.aboutads.info
              </a>{" "}
              for industry-wide opt-out options
            </li>
          </ul>

          <h2>Impact of Disabling Cookies</h2>
          <p>
            While you can use most of our Site without cookies, disabling them may:
          </p>
          <ul>
            <li>Prevent us from remembering your preferences</li>
            <li>Cause the cookie consent banner to reappear on every visit</li>
            <li>Limit our ability to improve the Site based on usage data</li>
            <li>Affect the relevance of ads you see</li>
          </ul>

          <h2>Updates to This Disclosure</h2>
          <p>
            We may update this Cookie Disclosure from time to time to reflect changes in 
            our practices or for legal reasons. Please check this page periodically for 
            updates.
          </p>

          <h2>More Information</h2>
          <p>
            For more details about how we collect and use your information, please see our{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>

          <p>
            If you have questions about our use of cookies, contact us at{" "}
            <a href="mailto:privacy@motivational-quote.org">privacy@motivational-quote.org</a>.
          </p>
        </div>
      </article>
    </Layout>
  );
}
