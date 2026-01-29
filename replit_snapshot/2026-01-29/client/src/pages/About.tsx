import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout
      title="About - Motivational Quotes"
      description="Learn about our mission to provide authentic public-domain wisdom and practical advice for personal growth."
      includeAdsense={false}
    >
      <article className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>About Motivational Quotes</h1>

          <h2>Our Mission</h2>
          <p>
            Motivational Quotes exists to provide timeless wisdom and actionable advice 
            for anyone seeking to improve their life, build better habits, and cultivate 
            a growth mindset. We believe that the best insights often come from those who 
            lived long before us—philosophers, writers, and leaders who distilled profound 
            truths through their experiences.
          </p>

          <h2>What We Offer</h2>
          <p>
            Our site features two main resources:
          </p>
          <ul>
            <li>
              <strong>Curated Quotes</strong>: A collection of public-domain quotes from 
              ancient philosophers (Marcus Aurelius, Epictetus, Seneca), classic authors 
              (Emerson, Thoreau, Shakespeare), and historical figures whose words continue 
              to inspire and guide.
            </li>
            <li>
              <strong>In-Depth Articles</strong>: Long-form blog posts covering topics like 
              discipline, motivation, mindset, well-being, personal growth, and relationships. 
              Each article provides practical strategies you can apply immediately—no fluff, 
              just clear examples and actionable steps.
            </li>
          </ul>

          <h2>Our Commitment to Quality</h2>
          <p>
            Every quote on this site is from verified public-domain sources, ensuring 
            authenticity and respect for intellectual property. Our articles are written 
            with a focus on substance over style—giving you real value and practical 
            guidance rather than empty platitudes.
          </p>

          <h2>Who We Serve</h2>
          <p>
            Whether you're a student building study habits, a professional working on 
            work-life balance, or anyone looking to overcome procrastination and live 
            with more intention, our content is designed to meet you where you are and 
            help you move forward.
          </p>

          <h2>Contact Us</h2>
          <p>
            Have questions, suggestions, or feedback? We'd love to hear from you. 
            Visit our <a href="/contact">Contact page</a> to get in touch.
          </p>
        </div>
      </article>
    </Layout>
  );
}
