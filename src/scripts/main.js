'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    return reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        clearTimeout(timer);

        return resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  function handler(e) {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  }

  document.addEventListener('mousedown', handler);
});

let leftClicked = false;
let rightClicked = false;
let resolved = false;
const thirdPromise = new Promise((resolve) => {
  function handler(e) {
    if (resolved) {
      return;
    }

    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolved = true;

      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  }

  document.addEventListener('mousedown', handler);
});

function showNotification(message, type) {
  let div = document.querySelector('[data-qa="notification"]');

  if (!div) {
    div = document.createElement('div');
    div.dataset.qa = 'notification';
    document.body.appendChild(div);
  }

  div.className = type;
  div.textContent = message;
}

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

secondPromise.then((msg) => showNotification(msg, 'success'));

thirdPromise.then((msg) => showNotification(msg, 'success'));
