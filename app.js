/*
 * JavaScript for the motivational quote generator.
 *
 * When the page loads or the user clicks the "New Quote" button, a random quote
 * from the quotes array will be displayed. All quotes are original or in the
 * public domain, helping the site maintain compliance with AdSense policies.
 */

// A collection of unique motivational quotes with attribution.
// These statements were created specifically for this project or adapted from public domain sources.
const quotes = [
    { text: 'Believe in yourself and embrace each challenge as an opportunity to grow.', author: 'Motivational Quotes Team' },
    { text: 'Success starts with a single step; keep moving forward one day at a time.', author: 'Motivational Quotes Team' },
    { text: 'Your mindset shapes your future—cultivate positivity and patience.', author: 'Motivational Quotes Team' },
    { text: 'Great achievements begin with the decision to try and the courage to persevere.', author: 'Motivational Quotes Team' },
    { text: 'Small, consistent actions build momentum that leads to meaningful change.', author: 'Motivational Quotes Team' },
    { text: 'Dream big, plan well, and take small steps to bring your vision to life.', author: 'Motivational Quotes Team' },
    { text: 'Embrace learning and let curiosity guide you toward new horizons.', author: 'Motivational Quotes Team' },
    { text: 'Focus on progress, not perfection; growth is a journey, not a destination.', author: 'Motivational Quotes Team' },
    { text: 'Strength comes from facing difficulties with grace, resilience and hope.', author: 'Motivational Quotes Team' },
    { text: 'Be kind to yourself while striving for improvement—self‑compassion fuels growth.', author: 'Motivational Quotes Team' }
];

// Select DOM elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');

// Function to display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = '— ' + quote.author;
}

// Event listener for button click
newQuoteBtn.addEventListener('click', displayRandomQuote);

// Display a random quote on page load
window.addEventListener('DOMContentLoaded', displayRandomQuote);
