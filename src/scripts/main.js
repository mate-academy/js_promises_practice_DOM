'use strict';

const showNotification = (message, className) =>
  document.body.insertAdjacentHTML('beforeend', `
    <div class=${className} data-qa='notification'>
      ${message}
    </div>
  `
  );

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  }
  );

  setTimeout(() => reject(new Error()), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    const btn = e.button === 0 || e.button === 2;

    if (!btn) {
      return;
    };

    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let isLeft = false;
  let isRigh = false;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      isLeft = true;
    }

    if (e.button === 2) {
      isRigh = true;
    }

    if (isLeft && isRigh) {
      resolve();
    }
  });
});

firstPromise
  .then(() => showNotification('First promise was resolved', 'success'))
  .catch(() => showNotification('First promise was rejected', 'warning'));

secondPromise
  .then(() => showNotification('Second promise was resolved', 'success'));

thirdPromise
  .then(() => showNotification('Third promise was resolved', 'success'));
