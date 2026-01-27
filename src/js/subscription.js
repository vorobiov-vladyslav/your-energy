import { postSubscription } from './api.js';

export function initSubscription() {
  const form = document.querySelector('.footer-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const input = form.querySelector('.footer-input');
    const email = input.value.trim();
    if (!email) return;

    const emailPattern =
      /^\w+(\.\w+)?@[a-zA-Z_]+(\.[a-zA-Z_]+)*\.[a-zA-Z]{2,3}$/;

    let msgEl = form.querySelector('.footer-form-message');
    if (!msgEl) {
      msgEl = document.createElement('p');
      msgEl.classList.add('footer-form-message');
      form.appendChild(msgEl);
    }

    if (!emailPattern.test(email)) {
      msgEl.textContent = 'Please enter a valid email address.';
      msgEl.className = 'footer-form-message footer-form-message--error';
      msgEl.hidden = false;
      return;
    }
    try {
      const data = await postSubscription(email);
      msgEl.textContent = data.message || 'Subscription successful!';
      msgEl.className = 'footer-form-message footer-form-message--success';
      msgEl.hidden = false;
      input.value = '';
    } catch (err) {
      msgEl.textContent =
        err.message || 'Subscription failed. Please try again.';
      msgEl.className = 'footer-form-message footer-form-message--error';
      msgEl.hidden = false;
    }
  });
}
