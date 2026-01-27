import { workoutCardMarkup } from './markup.js';
import { renderPagination } from './pagination.js';

const STORAGE_KEY = 'favorites';
const PER_PAGE = 8;

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function addFavorite(exercise) {
  const favs = getFavorites();
  if (favs.some(f => f._id === exercise._id)) return;
  favs.push(exercise);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function removeFavorite(id) {
  const favs = getFavorites().filter(f => f._id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function isFavorite(id) {
  return getFavorites().some(f => f._id === id);
}

export function initFavoritesPage() {
  const listEl = document.querySelector('.favorites-list');
  const paginationEl = document.querySelector('.favorites-content .pagination');
  if (!listEl) return;

  let currentPage = 1;

  function render(page) {
    currentPage = page;
    const favs = getFavorites();

    if (favs.length === 0) {
      listEl.innerHTML =
        '<li class="favorites-empty"><p>It appears that you haven\'t added any exercises to your favorites yet. Start exploring and add exercises that you enjoy to your favorites for easy access in the future.</p></li>';
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    const totalPages = Math.ceil(favs.length / PER_PAGE);
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * PER_PAGE;
    const slice = favs.slice(start, start + PER_PAGE);

    listEl.innerHTML = slice
      .map(ex => workoutCardMarkup(ex, { showTrash: true }))
      .join('');

    if (paginationEl) {
      renderPagination(paginationEl, currentPage, totalPages, render);
    }
  }

  listEl.addEventListener('click', e => {
    const trashBtn = e.target.closest('[data-remove-id]');
    if (!trashBtn) return;
    removeFavorite(trashBtn.dataset.removeId);
    render(currentPage);
  });

  render(1);
}
