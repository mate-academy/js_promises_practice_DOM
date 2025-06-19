'use strict';

const showNotification = (message, type) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const handler = (e) => {
    if (e.button === 0) {
      clearTimeout(timeout);
      resolve('First promise was resolved');
      document.removeEventListener('click', handler);
    }
  };

  document.addEventListener('click', handler);
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

secondPromise.then((msg) => showNotification(msg, 'success'));

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

thirdPromise.then((msg) => showNotification(msg, 'success'));
document.addEventListener('contextmenu', (e) => e.preventDefault());
