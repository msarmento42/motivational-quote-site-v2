<script>
/**
 * Quote loader: STRICT public-domain only, no external APIs.
 * Loads from /data/quotes-public-domain.json and picks a random quote.
 * Shows “— Author” attribution. If file missing, uses a tiny in-file fallback.
 */
(async () => {
  const quoteText   = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const btn         = document.getElementById('new-quote-btn');

  const fallback = [
    { text: "Go confidently in the direction of your dreams. Live the life you have imagined.", author: "Henry David Thoreau" },
    { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
    { text: "What you do speaks so loudly that I cannot hear what you say.", author: "Ralph Waldo Emerson" },
    { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { text: "Wisdom begins in wonder.", author: "Socrates" }
  ];

  let quotes = [];
  async function load() {
    try {
      const res = await fetch('/data/quotes-public-domain.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('quotes json not found');
      quotes = await res.json();
      if (!Array.isArray(quotes) || !quotes.length) throw new Error('empty quotes');
    } catch (e) {
      quotes = fallback;
    }
  }

  function showRandom() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = q.text;
    quoteAuthor.textContent = q.author ? `— ${q.author}` : '';
  }

  await load();
  showRandom();
  if (btn) btn.addEventListener('click', showRandom);
})();
</script>
