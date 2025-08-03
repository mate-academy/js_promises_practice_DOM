'use strict';

const clicked = {
  left: false,
  right: false,
};

const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  // eslint-disable-next-line no-shadow
  function onClick(event) {
    if (event.button === 0) {
      resolved = true;
      document.removeEventListener('mousedown', onClick);
      resolve('First promise was resolved');
    }
  }

  document.addEventListener('mousedown', onClick);

  setTimeout(() => {
    if (!resolved) {
      document.removeEventListener('mousedown', onClick);
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  function onClick(event) {
    if (event.button === 0 || event.button === 2) {
      document.removeEventListener('mousedown', onClick);
      resolve('Second promise was resolved');
    }
  }

  document.addEventListener('mousedown', onClick);
});

const thirdPromise = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  function onClick(event) {
    if (event.button === 0) {
      clicked.left = true;
    }

    if (event.button === 2) {
      clicked.right = true;
    }

    if (clicked.left && clicked.right) {
      document.removeEventListener('mousedown', onClick);
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('mousedown', onClick);
});

function showNotification(message, type = 'success') {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = type === 'success' ? 'success' : 'error';
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

secondPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

thirdPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

document.addEventListener('contextmenu', (e) => e.preventDefault());
