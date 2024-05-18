'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

createNotification(firstPromise);

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');

    // eslint-disable-next-line no-shadow
    const thirdPromise = new Promise((resolve) => {
      resolve('Third promise was resolved');
    });

    createNotification(thirdPromise);
  });
});

createNotification(secondPromise);

function createNotification(promise) {
  promise
    .then((message) => {
      body.insertAdjacentHTML(
        'beforeend',
        `<div class="success" data-qa="notification">${message}</div>`,
      );
    })
    .catch((error) => {
      body.insertAdjacentHTML(
        'beforeend',
        `<div class="error" data-qa="notification">${error}</div>`,
      );
    });
}
