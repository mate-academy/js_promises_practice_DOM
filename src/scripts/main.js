'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;
  document.body.appendChild(div);
}

document.addEventListener('contextmenu', (e) => e.preventDefault());

// First promise
const firstPromise = new Promise((resolve, reject) => {
  function onDown(e) {
    if (e.button === 0) {
      clearTimeout(timer);
      document.removeEventListener('mousedown', onDown);
      resolve('First promise was resolved');
    }
  }

  const timer = setTimeout(() => {
    document.removeEventListener('mousedown', onDown);
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('mousedown', onDown, { once: true });
});

// Second promise
const secondPromise = new Promise((resolve) => {
  function onDown(e) {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  }
  document.addEventListener('mousedown', onDown, { once: true });
});

// Third promise
const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  function onDown(e) {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', onDown);
    }
  }

  document.addEventListener('mousedown', onDown);
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err?.message ?? String(err), 'error'));

secondPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err?.message ?? String(err), 'error'));

thirdPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err?.message ?? String(err), 'error'));
