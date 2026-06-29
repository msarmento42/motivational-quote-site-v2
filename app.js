<script>
(async () => {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const newQuoteBtn = document.getElementById('new-quote-btn');
  const saveQuoteBtn = document.getElementById('save-quote-btn');
  const favoritesSection = document.getElementById('favorites-section');
  const favoritesList = document.getElementById('favorites-list');
  // New elements for saved quotes section
  const savedQuotesSection = document.getElementById('saved-quotes-section');
  const savedList = document.getElementById('saved-list');

  const fallback = [
    { text: "Go confidently in the direction of your dreams. Live the life you have imagined.", author: "Henry David Thoreau" },
    { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
    { text: "What you do speaks so loudly that I cannot hear what you say.", author: "Ralph Waldo Emerson" },
    { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { text: "Wisdom begins in wonder.", author: "Socrates" }
  ];

  let quotes = [];
  let favorites = [];

  async function loadQuotes() {
    try {
      const res = await fetch('/data/quotes-public-domain.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('quotes json not found');
      quotes = await res.json();
      if (!Array.isArray(quotes) || !quotes.length) throw new Error('empty quotes');
    } catch (e) {
      quotes = fallback;
    }
  }

  function loadFavorites() {
    try {
      const storedFavorites = localStorage.getItem('mq_favorites');
      favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      renderFavorites();
      renderSavedQuotes(); // Call new render function
    } catch (e) {
      console.error('Failed to load favorites from localStorage', e);
      favorites = [];
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem('mq_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }

  function toggleFavorite() {
    const currentQuote = {
      text: quoteText.textContent,
      author: quoteAuthor.textContent
    };

    const index = favorites.findIndex(fav => fav.text === currentQuote.text && fav.author === currentQuote.author);
    if (index === -1) {
      favorites.push(currentQuote);
      saveQuoteBtn.textContent = "✓ Saved";
    } else {
      favorites.splice(index, 1);
      saveQuoteBtn.textContent = "❤ Save Quote";
    }
    saveFavorites();
    renderFavorites();
    renderSavedQuotes(); // Call new render function
  }

  function renderFavorites() {
    favoritesList.innerHTML = '';
    if (favorites.length === 0) {
      favoritesSection.style.display = 'none';
      return;
    }

    favoritesSection.style.display = 'block';
    favorites.forEach((fav, index) => {
      const row = document.createElement('div');
      row.className = 'favorite-row';

      const text = document.createElement('p');
      text.textContent = `${fav.text} ${fav.author}`;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '×';
      removeBtn.className = 'remove-button';
      removeBtn.addEventListener('click', () => {
        favorites.splice(index, 1);
        saveFavorites();
        renderFavorites();
        renderSavedQuotes(); // Update new section as well
      });

      row.appendChild(text);
      row.appendChild(removeBtn);
      favoritesList.appendChild(row);
    });
  }

  // New function to render saved quotes in the dedicated section
  function renderSavedQuotes() {
    savedList.innerHTML = '';
    if (favorites.length === 0) {
      savedQuotesSection.style.display = 'none';
      savedList.innerHTML = '<p class="empty-state">No saved quotes yet — click ♥ on any quote to save one.</p>';
      return;
    }

    savedQuotesSection.style.display = 'block';
    favorites.forEach((fav, index) => {
      const card = document.createElement('div');
      card.className = 'saved-quote-card';

      const text = document.createElement('p');
      text.textContent = `${fav.text} ${fav.author}`;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '×';
      removeBtn.className = 'remove-button'; // Reusing existing remove-button style
      removeBtn.addEventListener('click', () => {
        favorites.splice(index, 1);
        saveFavorites();
        renderFavorites(); // Update old section
        renderSavedQuotes(); // Update new section
      });

      card.appendChild(text);
      card.appendChild(removeBtn);
      savedList.appendChild(card);
    });
  }

  async function showRandom() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = q.text;
    quoteAuthor.textContent = q.author ? `— ${q.author}` : '';

    const isFavorite = favorites.some(fav => fav.text === q.text && fav.author === q.author);
    saveQuoteBtn.textContent = isFavorite ? "✓ Saved" : "❤ Save Quote";
  }

  await loadQuotes();
  loadFavorites(); // This now calls both render functions
  showRandom();

  newQuoteBtn.addEventListener('click', showRandom);
  saveQuoteBtn.addEventListener('click', toggleFavorite);
})();
</script>
