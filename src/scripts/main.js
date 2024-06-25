'use strict';

const body = document.body;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClickPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise]).then(
  () => {
    return 'Third promise was resolved';
  },
);

firstPromise
  .then((result) => {
    body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">${result}</div>`,
    );
  })
  .catch((error) => {
    body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">${error}</div>`,
    );
  });

secondPromise.then((result) => {
  body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="success">${result}</div>`,
  );
});

thirdPromise.then((result) => {
  body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="success">${result}</div>`,
  );
});
