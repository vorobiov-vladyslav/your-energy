import { getExerciseById } from './api.js';
import { exerciseModalMarkup } from './markup.js';
import {
  addFavorite,
  removeFavorite,
  isFavorite,
  getFavorites,
} from './favorites.js';
import { openRatingModal } from './rating-modal.js';
import { icons } from './icons.js';

let backdropEl;

export function initExerciseModal() {
  backdropEl = document.querySelector('[data-modal-exercise]');
  if (!backdropEl) return;

  document.addEventListener('click', e => {
    const startBtn = e.target.closest('[data-start-id]');
    if (!startBtn) return;
    openModal(startBtn.dataset.startId);
  });

  backdropEl.addEventListener('click', e => {
    if (e.target === backdropEl || e.target.closest('[data-modal-close]')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !backdropEl.hidden) {
      closeModal();
    }
  });
}

export async function openModal(id) {
  try {
    const exercise = await getExerciseById(id);
    const isFav = isFavorite(id);
    backdropEl.innerHTML = exerciseModalMarkup(exercise, isFav);
    backdropEl.hidden = false;
    document.body.style.overflow = 'hidden';

    const favBtn = backdropEl.querySelector('[data-fav-id]');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        const textEl = favBtn.querySelector('span');
        const iconEl = favBtn.querySelector('img');
        if (isFavorite(id)) {
          removeFavorite(id);
          if (textEl) textEl.textContent = 'Add to favorites';
          if (iconEl) iconEl.src = icons.heartDark;
        } else {
          addFavorite(exercise);
          if (textEl) textEl.textContent = 'Remove';
          if (iconEl) iconEl.src = icons.heartFilledDark;
        }
        const favList = document.querySelector('.favorites-list');
        if (favList && document.querySelector('.favorites')) {
          const { initFavoritesPage } = getFavoritesModule();
          if (initFavoritesPage) initFavoritesPage();
        }
      });
    }

    const ratingBtn = backdropEl.querySelector('[data-rating-id]');
    if (ratingBtn) {
      ratingBtn.addEventListener('click', () => {
        closeModal();
        openRatingModal(ratingBtn.dataset.ratingId);
      });
    }
  } catch {}
}

function closeModal() {
  if (!backdropEl) return;
  backdropEl.hidden = true;
  backdropEl.innerHTML = '';
  document.body.style.overflow = '';
}

function getFavoritesModule() {
  return { initFavoritesPage: window.__reinitFavorites };
}
