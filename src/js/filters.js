import { getFilters } from './api.js';
import { filterCardMarkup } from './markup.js';
import { renderPagination } from './pagination.js';
import { showExercises, hideExercises } from './exercises.js';

const FILTER_MAP = {
  muscles: 'Muscles',
  'body-parts': 'Body parts',
  equipment: 'Equipment',
};

const PARAM_MAP = {
  muscles: 'muscles',
  'body-parts': 'bodypart',
  equipment: 'equipment',
};

let currentFilter = 'muscles';
let currentPage = 1;

export function initFilters() {
  const tabsContainer = document.querySelector('.exercises-tabs');
  const listEl = document.querySelector('.exercises-list');
  const paginationEl = document.querySelector('.exercises-grid .pagination');
  const titleEl = document.querySelector('.exercises-title');
  if (!tabsContainer || !listEl) return;

  tabsContainer.addEventListener('click', e => {
    const tab = e.target.closest('.exercises-tab');
    if (!tab) return;

    tabsContainer
      .querySelectorAll('.exercises-tab')
      .forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');

    currentFilter = tab.dataset.filter;
    currentPage = 1;
    hideExercises();
    if (titleEl) titleEl.innerHTML = 'Exercises';
    fetchAndRender();
  });

  listEl.addEventListener('click', e => {
    const card = e.target.closest('.exercise-card');
    if (!card) return;
    e.preventDefault();
    const name = card.dataset.name;
    const paramName = PARAM_MAP[currentFilter];
    showExercises(name, paramName, titleEl, listEl, paginationEl, () => {
      fetchAndRender();
    });
  });

  function fetchAndRender() {
    fetchFilters(currentFilter, currentPage, listEl, paginationEl);
  }

  fetchAndRender();
}

async function fetchFilters(filter, page, listEl, paginationEl) {
  try {
    const data = await getFilters(FILTER_MAP[filter], page, 12);
    const items = data.results || [];
    if (items.length === 0) {
      listEl.innerHTML =
        '<li class="exercise-card"><p style="padding:20px;text-align:center;">No categories found.</p></li>';
    } else {
      listEl.innerHTML = items.map(filterCardMarkup).join('');
    }

    const totalPages = parseInt(data.totalPages, 10);
    if (paginationEl) {
      renderPagination(paginationEl, page, totalPages, newPage => {
        currentPage = newPage;
        fetchFilters(filter, newPage, listEl, paginationEl);
      });
    }
  } catch {
    listEl.innerHTML =
      '<li class="exercise-card"><p style="padding:20px;text-align:center;">Failed to load filters.</p></li>';
  }
}
