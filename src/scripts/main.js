'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;
  document.body.appendChild(div);
}

// First promise
const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  function onDown(e) {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  }

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
  .catch((err) => showNotification(err.message, 'error'));

secondPromise.then((msg) => showNotification(msg, 'success'));

thirdPromise.then((msg) => showNotification(msg, 'success'));
