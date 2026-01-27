import { patchExerciseRating } from './api.js';
import { ratingModalMarkup } from './markup.js';
import { icons } from './icons.js';

let backdropEl;

export function initRatingModal() {
  backdropEl = document.querySelector('[data-modal-rating]');
  if (!backdropEl) return;

  backdropEl.addEventListener('click', e => {
    if (e.target === backdropEl || e.target.closest('[data-modal-close]')) {
      closeRatingModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdropEl && !backdropEl.hidden) {
      closeRatingModal();
    }
  });
}

export function openRatingModal(exerciseId) {
  if (!backdropEl) return;
  backdropEl.innerHTML = ratingModalMarkup(exerciseId);
  backdropEl.hidden = false;
  document.body.style.overflow = 'hidden';

  let selectedRating = 0;
  const stars = backdropEl.querySelectorAll('[data-star]');
  const valueEl = backdropEl.querySelector('.modal-rating-value');
  const form = backdropEl.querySelector('.modal-rating-form');

  stars.forEach(star => {
    star.style.cursor = 'pointer';
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.star, 10);
      updateStars(stars, selectedRating);
      if (valueEl) valueEl.textContent = selectedRating.toFixed(1);
    });
  });

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const msgEl = form.querySelector('.modal-rating-message');
      const email = form.email.value.trim();
      const review = form.review.value.trim();

      if (!selectedRating || !email || !review) {
        if (msgEl) {
          msgEl.textContent =
            'Please fill in all fields: rating, email, and comment.';
          msgEl.hidden = false;
        }
        return;
      }

      try {
        await patchExerciseRating(exerciseId, {
          rate: selectedRating,
          email,
          review,
        });
        if (msgEl) {
          msgEl.textContent = 'Thank you for your rating!';
          msgEl.className =
            'modal-rating-message modal-rating-message--success';
          msgEl.hidden = false;
        }
        setTimeout(async () => {
          closeRatingModal();
          const { openModal } = await import('./exercise-modal.js');
          openModal(exerciseId);
        }, 1500);
      } catch (err) {
        if (msgEl) {
          msgEl.textContent =
            err.message || 'Failed to send rating. Please try again.';
          msgEl.className = 'modal-rating-message modal-rating-message--error';
          msgEl.hidden = false;
        }
      }
    });
  }
}

function closeRatingModal() {
  if (!backdropEl) return;
  backdropEl.hidden = true;
  backdropEl.innerHTML = '';
  document.body.style.overflow = '';
}

function updateStars(stars, rating) {
  stars.forEach(star => {
    const val = parseInt(star.dataset.star, 10);
    star.src = val <= rating ? icons.starOrange : icons.starGrey;
  });
}
