import { getExercises } from './api.js';
import { workoutCardMarkup } from './markup.js';
import { renderPagination } from './pagination.js';
import { initSearch, destroySearch } from './search.js';

let currentParams = {};
let currentPage = 1;
let listEl, paginationEl, goBack;

export function showExercises(
  categoryName,
  paramName,
  titleEl,
  _listEl,
  _paginationEl,
  _goBack
) {
  listEl = _listEl;
  paginationEl = _paginationEl;
  goBack = _goBack;
  currentPage = 1;
  currentParams = { [paramName]: categoryName, page: 1, limit: 10 };

  if (titleEl) {
    titleEl.innerHTML = `<span class="exercises-title-back">Exercises</span> / <span class="exercises-title-category">${categoryName}</span>`;
    const backBtn = titleEl.querySelector('.exercises-title-back');
    if (backBtn) {
      backBtn.style.cursor = 'pointer';
      backBtn.addEventListener(
        'click',
        () => {
          hideExercises();
          if (titleEl) titleEl.innerHTML = 'Exercises';
          goBack();
        },
        { once: true }
      );
    }
  }

  initSearch(keyword => {
    currentParams.keyword = keyword || undefined;
    currentPage = 1;
    currentParams.page = 1;
    fetchAndRender();
  });

  fetchAndRender();
}

export function hideExercises() {
  destroySearch();
  if (listEl) listEl.classList.remove('exercises-list--workouts');
}

async function fetchAndRender() {
  if (!listEl) return;
  try {
    const params = { ...currentParams, page: currentPage };
    Object.keys(params).forEach(
      k => params[k] === undefined && delete params[k]
    );
    const data = await getExercises(params);
    const items = data.results || [];

    if (items.length === 0) {
      listEl.innerHTML =
        '<li class="workout-card"><p style="padding:20px;text-align:center;">No exercises found.</p></li>';
    } else {
      listEl.innerHTML = items.map(ex => workoutCardMarkup(ex)).join('');
    }
    listEl.classList.add('exercises-list--workouts');

    const totalPages = parseInt(data.totalPages, 10) || 1;
    if (paginationEl) {
      renderPagination(paginationEl, currentPage, totalPages, page => {
        currentPage = page;
        fetchAndRender();
      });
    }
  } catch {
    listEl.innerHTML =
      '<li class="workout-card"><p style="padding:20px;text-align:center;">Failed to load exercises.</p></li>';
  }
}
