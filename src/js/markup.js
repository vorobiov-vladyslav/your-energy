import { icons } from './icons.js';

export function filterCardMarkup({ name, filter, imgURL }) {
  return `<li class="exercise-card" data-name="${name}" data-filter="${filter}">
  <a class="exercise-card-link" href="#">
    <img src="${imgURL}" alt="${name}" class="exercise-card-img" loading="lazy" />
    <div class="exercise-card-overlay">
      <p class="exercise-card-name">${name}</p>
      <p class="exercise-card-subtitle">${filter}</p>
    </div>
  </a>
</li>`;
}

export function workoutCardMarkup(exercise, { showTrash = false } = {}) {
  const trashBtn = showTrash
    ? `<button class="workout-card-trash" type="button" aria-label="Remove from favorites" data-remove-id="${exercise._id}">
        <img src="${icons.trash}" alt="" width="16" height="16" />
      </button>`
    : '';

  const ratingValue = exercise.rating ? exercise.rating.toFixed(1) : '0.0';

  return `<li class="workout-card" data-exercise-id="${exercise._id}">
  <div class="workout-card-top">
    <span class="workout-card-badge">WORKOUT</span>
    <span class="workout-card-rating">${ratingValue}<img src="${icons.starOrange}" alt="rating" /></span>
    ${trashBtn}
    <button class="workout-card-start" type="button" data-start-id="${exercise._id}">Start <img src="${icons.arrowRight}" alt="" /></button>
  </div>
  <div class="workout-card-body">
    <div class="workout-card-icon">
      <img src="${icons.runningManLight}" alt="" width="24" height="24" />
    </div>
    <h3 class="workout-card-name">${exercise.name}</h3>
  </div>
  <div class="workout-card-meta">
    <span>Burned calories: <strong>${exercise.burnedCalories} / ${exercise.time} min</strong></span>
    <span>Body part: <strong>${exercise.bodyPart}</strong></span>
    <span>Target: <strong>${exercise.target}</strong></span>
  </div>
</li>`;
}

export function exerciseModalMarkup(exercise, isFav) {
  const stars = renderStars(exercise.rating);
  const favText = isFav ? 'Remove' : 'Add to favorites';
  const heartIcon = isFav ? icons.heartFilledDark : icons.heartDark;

  return `<div class="modal-exercise-content">
  <button class="modal-close" type="button" aria-label="Close" data-modal-close>
    <img class="modal-close-icon" src="${icons.xLight}" alt="" width="24" height="24" />
  </button>
  <div class="modal-exercise-gif">
    <img src="${exercise.gifUrl}" alt="${exercise.name}" />
  </div>
  <div class="modal-exercise-info">
    <h3 class="modal-exercise-title">${exercise.name}</h3>
    <div class="modal-exercise-rating">
      <span class="modal-exercise-rating-value">${exercise.rating.toFixed(1)}</span>
      <div class="modal-exercise-stars">${stars}</div>
    </div>
    <div class="modal-exercise-details">
      <div class="modal-exercise-detail-item">
        <span class="modal-exercise-detail-label">Target</span>
        <span class="modal-exercise-detail-value">${exercise.target}</span>
      </div>
      <div class="modal-exercise-detail-item">
        <span class="modal-exercise-detail-label">Body Part</span>
        <span class="modal-exercise-detail-value">${exercise.bodyPart}</span>
      </div>
      <div class="modal-exercise-detail-item">
        <span class="modal-exercise-detail-label">Equipment</span>
        <span class="modal-exercise-detail-value">${exercise.equipment}</span>
      </div>
      <div class="modal-exercise-detail-item">
        <span class="modal-exercise-detail-label">Popular</span>
        <span class="modal-exercise-detail-value">${exercise.popularity}</span>
      </div>
      <div class="modal-exercise-detail-item">
        <span class="modal-exercise-detail-label">Burned calories</span>
        <span class="modal-exercise-detail-value">${exercise.burnedCalories}/${exercise.time} min</span>
      </div>
    </div>
    <p class="modal-exercise-desc">${exercise.description}</p>
    <div class="modal-exercise-actions">
      <button class="modal-btn modal-btn-fav" type="button" data-fav-id="${exercise._id}">
        <span>${favText}</span>
        <img class="modal-btn-fav-icon" src="${heartIcon}" alt="" width="18" height="18" />
      </button>
      <button class="modal-btn modal-btn-rating" type="button" data-rating-id="${exercise._id}">Give a rating</button>
    </div>
  </div>
</div>`;
}

export function ratingModalMarkup(exerciseId) {
  return `<div class="modal-rating-content">
  <button class="modal-close" type="button" aria-label="Close" data-modal-close>
    <img class="modal-close-icon" src="${icons.xLight}" alt="" width="28" height="28" />
  </button>
  <p class="modal-rating-label">Rating</p>
  <div class="modal-rating-row">
    <span class="modal-rating-value">0.0</span>
    <div class="modal-rating-stars">
      ${[1, 2, 3, 4, 5]
        .map(
          n =>
            `<img class="modal-star" src="${icons.starGrey}" alt="${n} star" width="24" height="24" data-star="${n}" />`
        )
        .join('')}
    </div>
  </div>
  <form class="modal-rating-form" data-exercise-id="${exerciseId}">
    <input class="modal-rating-email" type="email" name="email" placeholder="Email" pattern="^\\w+(\\.\\w+)?@[a-zA-Z_]+(\\.[a-zA-Z_]+)*\\.[a-zA-Z]{2,3}$" required/>
    <textarea class="modal-rating-comment" name="review" placeholder="Your comment" rows="4" required></textarea>
    <button class="modal-rating-submit" type="submit">Send</button>
    <p class="modal-rating-message" hidden></p>
  </form>
</div>`;
}

function renderStars(rating) {
  const full = Math.round(rating);
  return [1, 2, 3, 4, 5]
    .map(
      n =>
        `<img src="${n <= full ? icons.starOrange : icons.starGrey}" alt="" width="14" height="14" />`
    )
    .join('');
}
