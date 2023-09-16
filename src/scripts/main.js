'use strict';

const body = document.getElementById('document');

const notify = (message, className) => {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${className}">${message}</div>`);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve(`First promise was resolved`);
    }
  });

  setTimeout(() => reject(new Error(`First promise was rejected`)), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve(`Third promise was resolved`);
    }
  });
});

firstPromise
  .then((result) => {
    notify(result, 'success');
  })
  .catch((error) => {
    notify(error.message, 'warning');
  });

secondPromise
  .then((result) => {
    notify(result, 'success');
  });

thirdPromise
  .then((result) => {
    notify(result, 'success');
  });
