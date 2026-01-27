let searchContainer;
let onSearchCallback;

export function initSearch(onSearch) {
  searchContainer = document.querySelector('.exercises-search');
  if (!searchContainer) return;
  searchContainer.hidden = false;
  onSearchCallback = onSearch;

  const input = searchContainer.querySelector('.exercises-search-input');
  const btn = searchContainer.querySelector('.exercises-search-btn');

  input.addEventListener('keydown', handleKeydown);
  btn.addEventListener('click', handleClick);
}

export function destroySearch() {
  if (!searchContainer) return;
  searchContainer.hidden = true;
  const input = searchContainer.querySelector('.exercises-search-input');
  const btn = searchContainer.querySelector('.exercises-search-btn');
  input.value = '';
  input.removeEventListener('keydown', handleKeydown);
  btn.removeEventListener('click', handleClick);
  searchContainer = null;
  onSearchCallback = null;
}

function handleKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    doSearch();
  }
}

function handleClick() {
  doSearch();
}

function doSearch() {
  if (!searchContainer || !onSearchCallback) return;
  const input = searchContainer.querySelector('.exercises-search-input');
  onSearchCallback(input.value.trim());
}
