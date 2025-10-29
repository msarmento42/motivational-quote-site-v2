/*
 * JavaScript for the motivational quote generator with strict public-domain attribution.
 * This version does NOT call any external API. All quotes below are US public domain.
 *
 * Sources (PD/original English):
 * - Benjamin Franklin, Poor Richard's Almanack & writings (pre-1775)
 * - Ralph Waldo Emerson, Essays (19th century)
 * - Henry David Thoreau, Walden (1854)
 * - Thomas A. Edison (pre-1929 publications/interviews)
 * - Theodore Roosevelt (pre-1920 speeches/letters)
 * - Oscar Wilde, plays/essays (pre-1900, UK/US PD)
 * - Charles Darwin (19th century)
 * - Samuel Johnson (18th century)
 * - Booker T. Washington (early 1900s)
 * - Alfred, Lord Tennyson (19th century)
 * - Washington Irving (19th century)
 * - Mark Twain (pre-1910 works)
 */

const fallbackQuotes = [
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { text: "Lost time is never found again.", author: "Benjamin Franklin" },
  { text: "What you do speaks so loudly I cannot hear what you say.", author: "Ralph Waldo Emerson" },
  { text: "The only way to have a friend is to be one.", author: "Ralph Waldo Emerson" },
  { text: "Our life is frittered away by detail; simplify, simplify.", author: "Henry David Thoreau" },
  { text: "Go confidently in the direction of your dreams; live the life you have imagined.", author: "Henry David Thoreau" },
  { text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas A. Edison" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Courage is resistance to fear, mastery of fear, not absence of it.", author: "Mark Twain" },
  { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { text: "A man who dares to waste one hour of time has not discovered the value of life.", author: "Charles Darwin" },
  { text: "Great works are performed not by strength but by perseverance.", author: "Samuel Johnson" },
  { text: "’Tis better to have loved and lost than never to have loved at all.", author: "Alfred, Lord Tennyson" },
  { text: "Few things help an individual more than to place responsibility upon him, and to let him know that you trust him.", author: "Booker T. Washington" },
  { text: "Great minds have purposes; others have wishes.", author: "Washington Irving" }
];

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');

function pickRandomQuote() {
  const i = Math.floor(Math.random() * fallbackQuotes.length);
  return fallbackQuotes[i];
}

function displayQuote(q) {
  quoteText.textContent = q.text;
  quoteAuthor.textContent = '— ' + q.author;
}

// Initial load
window.addEventListener('DOMContentLoaded', () => {
  displayQuote(pickRandomQuote());
});

// Button handler
newQuoteBtn?.addEventListener('click', () => {
  displayQuote(pickRandomQuote());
});
