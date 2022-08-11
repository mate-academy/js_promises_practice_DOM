'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document
    .addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        resolve('First promise was resolved');
      }
    });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPrimise = new Promise(resolve => {
  document
    .addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        e.preventDefault();
        resolve('Second promise was resolved');
      }
    });
});

const thirdPromise = new Promise((resolve) => {
  const clicks = new Set();

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      // e.preventDefault();
      clicks.add(e.button);
    }

    if (clicks.size === 2) {
      resolve('Third promise was resolved');
    }
  });
});

const handler = (result, type) => {
  const div = document.createElement('div');

  document.body.append(div);

  div.innerHTML = result;
  div.className = type;
  div.dataset.qa = 'notification';
};

firstPromise
  .then((result) => handler(result, 'success'))
  .catch((error) => handler(error, 'warning'));

secondPrimise
  .then((result) => handler(result, 'success'))
  .catch();

thirdPromise
  .then((result) => handler(result, 'success'))
  .catch();
