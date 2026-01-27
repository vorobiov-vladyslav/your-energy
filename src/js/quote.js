import { getQuote } from './api.js';

const QUOTE_STORAGE_KEY = 'dailyQuote';

function getTodayDateString() {
  return new Date().toDateString();
}

function getCachedQuote() {
  try {
    const cached = localStorage.getItem(QUOTE_STORAGE_KEY);
    if (!cached) return null;

    const { quote, author, date } = JSON.parse(cached);
    if (date !== getTodayDateString()) return null;

    return { quote, author };
  } catch {
    return null;
  }
}

function cacheQuote(quote, author) {
  try {
    localStorage.setItem(
      QUOTE_STORAGE_KEY,
      JSON.stringify({ quote, author, date: getTodayDateString() })
    );
  } catch {}
}

export function initQuote() {
  const quoteEl = document.querySelector('.quote-card-quote');
  const authorEl = document.querySelector('.quote-card-author');
  if (!quoteEl || !authorEl) return;

  const cached = getCachedQuote();
  if (cached) {
    quoteEl.textContent = cached.quote;
    authorEl.textContent = cached.author;
    return;
  }

  getQuote()
    .then(data => {
      quoteEl.textContent = data.quote;
      authorEl.textContent = data.author;
      cacheQuote(data.quote, data.author);
    })
    .catch(() => {});
}
