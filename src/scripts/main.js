'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => reject(new Error(`First promise was rejected`)),
    3000);
});
const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});
const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  });
});

const successHandler = (result) => {
  document.body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="success">${result}</div>`);
};
const errorHandler = (error) => {
  document.body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="warning">${error}</div>`);
};

firstPromise
  .then(successHandler)
  .catch(errorHandler);

secondPromise
  .then(successHandler)
  .catch(errorHandler);

thirdPromise
  .then(successHandler)
  .catch(errorHandler);
