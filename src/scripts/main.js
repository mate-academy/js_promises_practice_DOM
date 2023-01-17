'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
    resolve('Second promise was resolved');
  });
});

const clickRight = new Promise((resolve) => {
  document.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
    resolve();
  });
});

const clickLeft = new Promise((resolve) => {
  document.addEventListener('click', () => resolve());
});

const thirdPromise = new Promise((resolve) =>
  Promise
    .all([clickRight, clickLeft])
    .then(() => resolve('Third promise was resolved')));

function promiseHandler(className, message) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class=${className}>
      ${message}
    </div>
  `);
}

firstPromise
  .then((text) => promiseHandler('success', text))
  .catch((text) => promiseHandler('warning', text));

secondPromise.then((text) => promiseHandler('success', text));
thirdPromise.then((text) => promiseHandler('success', text));
