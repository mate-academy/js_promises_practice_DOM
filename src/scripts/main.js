'use strict';

const notification = (message, className) =>
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${className}" data-qa="notification">
      ${message}
    </div>
  `
  );

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => reject(new Error()), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    const button = e.button === 0 || e.button === 2;

    if (!button) {
      return;
    };

    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightBtn = false;
  let leftBtn = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftBtn = true;
    };

    if (e.button === 2) {
      rightBtn = true;
    };

    if (rightBtn && leftBtn) {
      resolve();
    };
  });
});

firstPromise
  .then(() => notification('First promise was resolved', 'success'))
  .catch(() => notification('First promise was rejected', 'warning'));

secondPromise
  .then(() => notification('Second promise was resolved', 'success'));

thirdPromise
  .then(() => notification('Third promise was resolved', 'success'));
