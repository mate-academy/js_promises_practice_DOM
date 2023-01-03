'use strict';

const body = document.querySelector('body');

function notification(message, classes) {
  body.insertAdjacentHTML('beforeend', `
      <div class="${classes}"data-qa="notification">${message}</div>
    `);
};

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise
  .then(() => notification('First promise was resolved', 'success'))
  .catch(() => notification('First promise was rejected', 'warning'));

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', (events) => {
    if (events.button === 0 || events.button === 2) {
      resolve();
    }
  });
});

secondPromise
  .then(() => notification('Second promise was resolved', 'success'));

const thirdPromises = new Promise((resolve, reject) => {
  body.addEventListener('click', (events) => {
    const leftButton = events.button === 0;
    const rightButton = events.button === 2;

    if (leftButton && rightButton) {
      resolve();
    }
  });
});

thirdPromises
  .then(() => notification('Third promise was resolved', 'success'));
