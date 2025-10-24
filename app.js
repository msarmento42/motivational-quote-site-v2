// app.js — local quotes only (public-domain set), no external API.
// Requirements in HTML: elements with ids #quote-text, #quote-author, #new-quote-btn

(async function () {
  const quoteText   = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const newBtn      = document.getElementById('new-quote-btn');

  // Minimal fallback if quotes.json isn't available
  const fallback = [
    { text: 'Well done is better than well said.', author: 'Benjamin Franklin' },
    { text: 'The only person you are destined to become is the person you decide to be.', author: 'Ralph Waldo Emerson' },
    { text: 'The journey of a thousand miles begins with a single step.', author: 'Laozi' }
  ];

  let quotes = [];

  async function loadQuotes() {
    try {
      const res = await fetch('./quotes.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('quotes.json not found');
      const data = await res.json();
      if (!Array.isArray(data) || !data.length) throw new Error('Invalid quotes.json');
      quotes = data;
    } catch (e) {
      console.warn('Using fallback quotes:', e?.message || e);
      quotes = fallback;
    }
  }

  function setRandomQuote() {
    if (!quotes.length) return;
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent   = q.text || '';
    quoteAuthor.textContent = q.author ? `— ${q.author}` : '';
  }

  await loadQuotes();
  setRandomQuote();
  newBtn?.addEventListener('click', setRandomQuote);
})();
