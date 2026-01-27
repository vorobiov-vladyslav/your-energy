const BASE_URL = 'https://your-energy.b.goit.study/api';

async function fetchData(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!res.ok) {
    let body;
    try {
      body = await res.json();
    } catch {}
    const err = new Error(body?.message || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export function getQuote() {
  return fetchData('/quote');
}

export function getFilters(filter, page = 1, limit = 12) {
  const params = new URLSearchParams({ filter, page, limit });
  return fetchData(`/filters?${params}`);
}

export function getExercises(params = {}) {
  const query = new URLSearchParams(params);
  return fetchData(`/exercises?${query}`);
}

export function getExerciseById(id) {
  return fetchData(`/exercises/${id}`);
}

export function patchExerciseRating(id, body) {
  return fetchData(`/exercises/${id}/rating`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export function postSubscription(email) {
  return fetchData('/subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}
