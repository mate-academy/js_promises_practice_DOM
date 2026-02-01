'use strict';

const body = document.querySelector('body');

// --- firstPromise ---
const promise1 = new Promise((resolve, reject) => {
  let settled = false;

  const clickHandler = (e) => {
    if (settled) {
      return;
    }

    if (e.button === 0) {
      settled = true;
      clearTimeout(timeoutId);
      body.removeEventListener('click', clickHandler);
      resolve('First promise was resolved');
    }
  };

  body.addEventListener('click', clickHandler);

  const timeoutId = setTimeout(() => {
    if (settled) {
      return;
    }
    settled = true;
    body.removeEventListener('click', clickHandler);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

// --- secondPromise ---
const promise2 = new Promise((resolve, reject) => {
  let settled = false;

  const handler = (e) => {
    if (settled) {
      return;
    }

    if (e.button === 0 || e.button === 2) {
      settled = true;
      body.removeEventListener('mousedown', handler);
      resolve('Second promise was resolved');
    }
  };

  body.addEventListener('mousedown', handler);
});

promise2
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

// --- thirdPromise ---
const promise3 = new Promise((resolve, reject) => {
  let settled = false;
  let left = false;
  let right = false;

  const handler = (e) => {
    if (settled) {
      return;
    }

    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      settled = true;
      body.removeEventListener('mousedown', handler);

      resolve(
        // eslint-disable-next-line max-len
        'Third promise was resolved',
      );
    }
  };

  body.addEventListener('mousedown', handler);
});

promise3
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

// --- helper function ---
function showNotification(text, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.textContent = text;
  body.appendChild(div);
}
