import { Layout } from "@/components/Layout";

export default function Attribution() {
  return (
    <Layout
      title="Attribution - Motivational Quotes"
      description="Learn about our quote sources and public domain policy."
      includeAdsense={false}
    >
      <article className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>Attribution & Sources</h1>

          <h2>Our Public Domain Commitment</h2>
          <p>
            Every quote featured on Motivational Quotes is from verified public-domain 
            sources. We are committed to respecting intellectual property rights while 
            sharing timeless wisdom that belongs to everyone.
          </p>

          <h2>What Is Public Domain?</h2>
          <p>
            A work enters the public domain when its copyright expires or if it was never 
            eligible for copyright protection. In the United States, works published before 
            1929 are generally in the public domain. Additionally, works by authors who died 
            more than 70 years ago (as of 2025, those who died before 1955) typically have 
            their works in the public domain.
          </p>

          <h2>Our Quote Sources</h2>
          <p>
            We source quotes from:
          </p>
          <ul>
            <li>
              <strong>Ancient Philosophers</strong>: Marcus Aurelius, Epictetus, Seneca, 
              Aristotle, Plato, Socrates, Confucius, Lao Tzu, Buddha
            </li>
            <li>
              <strong>Classic Authors</strong>: William Shakespeare, Ralph Waldo Emerson, 
              Henry David Thoreau, Leo Tolstoy, Oscar Wilde, Johann Wolfgang von Goethe
            </li>
            <li>
              <strong>Historical Figures</strong>: Abraham Lincoln, Benjamin Franklin, 
              Winston Churchill, Theodore Roosevelt, and others whose words have entered 
              the public domain
            </li>
          </ul>

          <h2>Verification Process</h2>
          <p>
            Before including any quote on our Site, we:
          </p>
          <ul>
            <li>Verify the quote's authenticity through reputable published sources</li>
            <li>Confirm the work's public domain status using resources such as:
              <ul>
                <li>Duke University's Public Domain Day announcements</li>
                <li>Stanford Copyright and Fair Use Center</li>
                <li>Public domain databases and literary archives</li>
              </ul>
            </li>
            <li>Provide proper attribution to the original author</li>
          </ul>

          <h2>Corrections and Suggestions</h2>
          <p>
            We strive for accuracy in both attribution and copyright status. If you believe:
          </p>
          <ul>
            <li>A quote is misattributed</li>
            <li>A quote's copyright status is incorrect</li>
            <li>A quote should be removed or corrected</li>
          </ul>
          <p>
            Please contact us immediately at{" "}
            <a href="mailto:contact@motivational-quote.org">contact@motivational-quote.org</a>. 
            We will investigate and take appropriate action, including removing or correcting 
            the quote if necessary.
          </p>

          <h2>Using Quotes from Our Site</h2>
          <p>
            Since our quotes are from public-domain sources, you are free to use them in 
            your own works. However, we appreciate attribution to the original author and, 
            if appropriate, a reference to our Site as a source.
          </p>

          <h2>References</h2>
          <ul>
            <li>
              <a href="https://law.duke.edu/cspd/publicdomainday/" target="_blank" rel="noopener noreferrer">
                Duke Law School - Public Domain Day
              </a>
            </li>
            <li>
              <a href="https://fairuse.stanford.edu/overview/public-domain/" target="_blank" rel="noopener noreferrer">
                Stanford Copyright and Fair Use Center - Public Domain
              </a>
            </li>
            <li>
              <a href="https://www.copyright.gov/help/faq/faq-duration.html" target="_blank" rel="noopener noreferrer">
                U.S. Copyright Office - Duration of Copyright
              </a>
            </li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            For questions about our attribution practices or to report an issue, 
            please email{" "}
            <a href="mailto:contact@motivational-quote.org">contact@motivational-quote.org</a>.
          </p>
        </div>
      </article>
    </Layout>
  );
}
