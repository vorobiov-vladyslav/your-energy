import { icons } from './icons.js';

export function renderPagination(
  containerEl,
  currentPage,
  totalPages,
  onPageClick
) {
  containerEl.innerHTML = '';
  if (totalPages <= 1) return;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const leftArrows = document.createElement('div');
  leftArrows.classList.add('pagination-arrows');
  leftArrows.innerHTML = `
    <button class="pagination-arrow" data-page="first" ${isFirstPage ? 'disabled' : ''} aria-label="First page">
      <img src="${isFirstPage ? icons.chevronDoubleLeftLight : icons.chevronDoubleLeftDark}" alt="" class="pagination-arrow-icon">
    </button>
    <button class="pagination-arrow" data-page="prev" ${isFirstPage ? 'disabled' : ''} aria-label="Previous page">
      <img src="${isFirstPage ? icons.chevronLeftLight : icons.chevronLeftDark}" alt="" class="pagination-arrow-icon">
    </button>
  `;
  containerEl.appendChild(leftArrows);

  const numbersContainer = document.createElement('div');
  numbersContainer.classList.add('pagination-numbers');

  const pages = getPaginationRange(currentPage, totalPages);
  pages.forEach(page => {
    if (page === '...') {
      const ellipsis = document.createElement('span');
      ellipsis.classList.add('pagination-ellipsis');
      ellipsis.textContent = '...';
      numbersContainer.appendChild(ellipsis);
    } else {
      const span = document.createElement('span');
      span.classList.add('pagination-num');
      if (page === currentPage) span.classList.add('is-active');
      span.textContent = page;
      span.dataset.page = page;
      numbersContainer.appendChild(span);
    }
  });
  containerEl.appendChild(numbersContainer);

  const rightArrows = document.createElement('div');
  rightArrows.classList.add('pagination-arrows', 'pagination-arrows--right');
  rightArrows.innerHTML = `
    <button class="pagination-arrow" data-page="next" ${isLastPage ? 'disabled' : ''} aria-label="Next page">
      <img src="${isLastPage ? icons.chevronLeftLight : icons.chevronLeftDark}" alt="" class="pagination-arrow-icon">
    </button>
    <button class="pagination-arrow" data-page="last" ${isLastPage ? 'disabled' : ''} aria-label="Last page">
      <img src="${isLastPage ? icons.chevronDoubleLeftLight : icons.chevronDoubleLeftDark}" alt="" class="pagination-arrow-icon">
    </button>
  `;
  containerEl.appendChild(rightArrows);

  containerEl.onclick = e => {
    e.stopPropagation();
    const target = e.target.closest('[data-page]');
    if (!target || target.disabled) return;

    const pageValue = target.dataset.page;
    let newPage;

    switch (pageValue) {
      case 'first':
        newPage = 1;
        break;
      case 'prev':
        newPage = Math.max(1, currentPage - 1);
        break;
      case 'next':
        newPage = Math.min(totalPages, currentPage + 1);
        break;
      case 'last':
        newPage = totalPages;
        break;
      default:
        newPage = parseInt(pageValue, 10);
    }

    if (newPage !== currentPage) {
      onPageClick(newPage);
    }
  };
}

function getPaginationRange(current, total) {
  if (total <= 4) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  const midPoint = Math.ceil(total / 2);

  let start = Math.max(1, current - 1);
  let end = Math.min(total, current + 1);

  if (end - start < 2) {
    if (start === 1) {
      end = Math.min(3, total);
    } else if (end === total) {
      start = Math.max(1, total - 2);
    }
  }

  if (current <= midPoint) {
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < total) {
      pages.push('...');
    }
  } else {
    if (start > 1) {
      pages.push('...');
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  return pages;
}
