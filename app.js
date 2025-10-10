/*
 * JavaScript for the motivational quote generator.
 *
 * When the page loads or the user clicks the "New Quote" button, a random quote
 * from the quotes array will be displayed. All quotes are original or in the
 * public domain, helping the site maintain compliance with AdSense policies.
 */

// A collection of unique motivational quotes. These statements were created
// specifically for this project or adapted from public domain sources. Feel free
// to expand this list with your own original phrases.
const quotes = [
    'Believe in yourself and embrace each challenge as an opportunity to grow.',
    'Success starts with a single step; keep moving forward one day at a time.',
    'Your mindset shapes your future—cultivate positivity and patience.',
    'Great achievements begin with the decision to try and the courage to persevere.',
    'Small, consistent actions build momentum that leads to meaningful change.',
    'Dream big, plan well, and take small steps to bring your vision to life.',
    'Embrace learning and let curiosity guide you toward new horizons.',
    'Focus on progress, not perfection; growth is a journey, not a destination.',
    'Strength comes from facing difficulties with grace, resilience and hope.',
    'Be kind to yourself while striving for improvement—self‑compassion fuels growth.'
];

// Select DOM elements
const quoteText = document.getElementById('quote-text');
const newQuoteBtn = document.getElementById('new-quote-btn');

// Function to display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex];
}

// Event listener for button click
newQuoteBtn.addEventListener('click', displayRandomQuote);

// Display a random quote on page load
window.addEventListener('DOMContentLoaded', displayRandomQuote);