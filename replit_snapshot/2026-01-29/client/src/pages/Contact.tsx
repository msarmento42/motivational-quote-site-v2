import { Layout } from "@/components/Layout";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <Layout
      title="Contact - Motivational Quotes"
      description="Get in touch with us for questions, suggestions, or feedback."
      includeAdsense={false}
    >
      <div className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              We'd love to hear from you! Whether you have questions about our content, 
              suggestions for new topics, or feedback to share, please don't hesitate 
              to reach out.
            </p>

            <div className="not-prose my-8 p-6 bg-muted/20 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold m-0">Email Us</h2>
              </div>
              <p className="text-muted-foreground mb-2">
                For general inquiries:
              </p>
              <a 
                href="mailto:contact@motivational-quote.org" 
                className="text-primary hover:underline text-lg font-medium"
                data-testid="link-email-contact"
              >
                contact@motivational-quote.org
              </a>
            </div>

            <h2>Response Time</h2>
            <p>
              We strive to respond to all emails within 48 hours during business days. 
              Thank you for your patience!
            </p>

            <h2>What to Expect</h2>
            <p>
              When you contact us, you can expect a thoughtful response addressing your 
              inquiry. We value your feedback and use it to improve our content and 
              user experience.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
