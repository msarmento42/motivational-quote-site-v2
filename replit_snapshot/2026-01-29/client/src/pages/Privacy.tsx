import { Layout } from "@/components/Layout";

export default function Privacy() {
  return (
    <Layout
      title="Privacy Policy - Motivational Quotes"
      description="Learn how we collect, use, and protect your information."
      includeAdsense={false}
    >
      <article className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>Privacy Policy</h1>
          
          <p className="text-sm text-muted-foreground">
            <strong>Last Updated:</strong> January 2025
          </p>

          <h2>Introduction</h2>
          <p>
            At Motivational Quotes ("we," "our," or "us"), we respect your privacy and 
            are committed to protecting your personal information. This Privacy Policy 
            explains how we collect, use, and safeguard your data when you visit our 
            website at motivational-quote.org (the "Site").
          </p>

          <h2>Information We Collect</h2>
          
          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our Site, we automatically collect certain information about 
            your device and browsing behavior through:
          </p>
          <ul>
            <li>
              <strong>Cookies</strong>: Small data files stored on your browser to remember 
              your preferences and improve your experience.
            </li>
            <li>
              <strong>Analytics</strong>: We use Google Analytics to collect information 
              about how visitors use our Site, including pages viewed, time spent, and 
              navigation patterns.
            </li>
          </ul>

          <h3>Information You Provide</h3>
          <p>
            We do not require you to create an account or provide personal information 
            to access our content. If you contact us via email, we may collect your email 
            address and any information you choose to share in your message.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use collected information to:
          </p>
          <ul>
            <li>Improve and optimize our Site's performance and user experience</li>
            <li>Analyze visitor behavior to create better content</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Display relevant advertisements through Google AdSense</li>
          </ul>

          <h2>Third-Party Services</h2>
          
          <h3>Google AdSense</h3>
          <p>
            We use Google AdSense to display advertisements on our Site. Google may use 
            the DoubleClick cookie and other tracking technologies to serve ads based on 
            your prior visits to our Site or other websites on the Internet. You can opt 
            out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a> or{" "}
            <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              www.aboutads.info
            </a>.
          </p>

          <h3>Google Analytics</h3>
          <p>
            We use Google Analytics to understand how visitors interact with our Site. 
            Google Analytics collects information anonymously and reports website trends 
            without identifying individual visitors. You can opt out of Google Analytics by 
            installing the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>

          <h2>Cookies</h2>
          <p>
            Our Site uses cookies to enhance your browsing experience. Cookies help us:
          </p>
          <ul>
            <li>Remember your preferences</li>
            <li>Understand how you use our Site</li>
            <li>Deliver relevant advertisements</li>
          </ul>
          <p>
            You can control cookies through your browser settings. However, disabling 
            cookies may limit your ability to use certain features of our Site.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information from 
            unauthorized access, alteration, disclosure, or destruction. However, no 
            internet transmission is completely secure, and we cannot guarantee absolute 
            security.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our Site is not directed to children under the age of 13. We do not knowingly 
            collect personal information from children under 13. If you believe we have 
            inadvertently collected such information, please contact us immediately.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal 
            information, including the right to access, correct, or delete your data. To 
            exercise these rights, please contact us at{" "}
            <a href="mailto:privacy@motivational-quote.org">privacy@motivational-quote.org</a>.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted 
            on this page with an updated "Last Updated" date. We encourage you to review 
            this policy periodically.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:privacy@motivational-quote.org">privacy@motivational-quote.org</a>
          </p>
        </div>
      </article>
    </Layout>
  );
}
