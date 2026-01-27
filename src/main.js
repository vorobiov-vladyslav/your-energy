const menuOpenBtn = document.querySelector('[data-menu-open]');
const menuCloseBtn = document.querySelector('[data-menu-close]');
const mobileMenu = document.querySelector('[data-menu]');

if (menuOpenBtn && menuCloseBtn && mobileMenu) {
  menuOpenBtn.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  menuCloseBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}

const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

import { initQuote } from './js/quote.js';
import { initFilters } from './js/filters.js';
import { initFavoritesPage } from './js/favorites.js';
import { initSubscription } from './js/subscription.js';
import { initExerciseModal } from './js/exercise-modal.js';
import { initRatingModal } from './js/rating-modal.js';

initQuote();
initSubscription();
initExerciseModal();
initRatingModal();

if (document.querySelector('.exercises')) {
  initFilters();
}

if (document.querySelector('.favorites')) {
  initFavoritesPage();
  window.__reinitFavorites = initFavoritesPage;
}
