/*
 * JavaScript for the motivational quote generator with proper author attribution.
 *
 * This script fetches random quotes from the ZenQuotes API and falls back to a local list
 * of public-domain quotes if the network request fails.
 */

/* Local fallback quotes with author attribution. These quotes are from public domain sources or attributed to authors with works published before 1929. */
const fallbackQuotes = [
    { text: 'Go confidently in the direction of your dreams. Live the life you have imagined.', author: 'Henry David Thoreau' },
    { text: 'Keep your face always toward the sunshine—and shadows will fall behind you.', author: 'Walt Whitman' },
    { text: 'What you do speaks so loudly that I cannot hear what you say.', author: 'Ralph Waldo Emerson' },
    { text: 'Do not go where the path may lead, go instead where there is no path and leave a trail.', author: 'Ralph Waldo Emerson' },
    { text: 'The journey of a thousand miles begins with a single step.', author: 'Lao Tzu' },
    { text: 'Well begun is half done.', author: 'Aristotle' },
    { text: 'Act as if what you do makes a difference. It does.', author: 'William James' },
    { text: 'An unexamined life is not worth living.', author: 'Socrates' },
    { text: 'Our greatest glory is not in never falling, but in rising every time we fall.', author: 'Confucius' },
    { text: 'In the midst of chaos, there is also opportunity.', author: 'Sun Tzu' },
    { text: 'Wisdom begins in wonder.', author: 'Socrates' },
    { text: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.', author: 'Ralph Waldo Emerson' },
    { text: 'Happiness depends upon ourselves.', author: 'Aristotle' },
    { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
    { text: 'Fortune favors the bold.', author: 'Virgil' },
    { text: 'Better to have loved and lost than never to have loved at all.', author: 'Alfred Lord Tennyson' },
    { text: 'Great minds have purposes, others have wishes.', author: 'Washington Irving' },
    { text: 'Success usually comes to those who are too busy to be looking for it.', author: 'Henry David Thoreau' },
    { text: 'Knowing yourself is the beginning of all wisdom.', author: 'Aristotle' },
    { text: 'He who is brave is free.', author: 'Seneca' }
];

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');

/* Fetch a random quote from the ZenQuotes API or fall back to a local quote. */
async function fetchQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        const data = await response.json();
        /* The API returns an array with objects that have q (quote) and a (author) properties. */
        const quoteObj = data[0];
        quoteText.textContent = quoteObj.q;
        quoteAuthor.textContent = '— ' + quoteObj.a;
    } catch (error) {
        /* If the API call fails, display a random quote from the fallback list. */
        const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
        const quote = fallbackQuotes[randomIndex];
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = '— ' + quote.author;
    }
}

/* Event listener for the New Quote button. */
newQuoteBtn.addEventListener('click', fetchQuote);

/* Display a quote on initial page load. */
window.addEventListener('DOMContentLoaded', fetchQuote);
