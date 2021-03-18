'use strict';

const root = document.querySelector('.root');

const promiseMessageSuccess = (message) => {
  root.insertAdjacentHTML('beforeend', `
    <div class="success" data-qa="notification">
      ${message}
    <div/>
  `);
};

const promiseMessageError = (message) => {
  root.insertAdjacentHTML('beforeend', `
    <div class="warning" data-qa="notification">
      ${message}
    <div/>
  `);
};

const firstPromise = (successMessage, errorMessage) => {
  return new Promise((resolve, reject) => {
    document.addEventListener('mousedown', e => {
      e.preventDefault();

      if (e.button >= 0 && e.button <= 2) {
        resolve(successMessage);
      }
    });

    setTimeout(() => {
      reject(errorMessage);
    }, 3000);
  });
};

const promise = firstPromise(
  'First promise was resolved',
  'First promise was rejected'
);

promise.then(promiseMessageSuccess, promiseMessageError);

const secondPromise = (successMessage) => {
  return new Promise((resolve) => {
    document.addEventListener('mousedown', e => {
      if (e.button === 0 || e.button === 2) {
        resolve(successMessage);
      }
    });
  });
};

const promiseClickOnce = secondPromise('Second promise was resolved');

promiseClickOnce.then(promiseMessageSuccess);

let leftButtonIsClicked = false;
let rightButtonIsClicked = false;

const thirdPromise = (successMessage) => {
  return new Promise((resolve) => {
    document.addEventListener('mousedown', e => {
      e.preventDefault();

      if (e.button === 0) {
        leftButtonIsClicked = true;
      }

      if (e.button === 2) {
        rightButtonIsClicked = true;
      }

      if (leftButtonIsClicked && rightButtonIsClicked) {
        resolve(successMessage);
      }
    });
  });
};

const promiseDoubleClick = thirdPromise('Third promise was resolved');

promiseDoubleClick.then(promiseMessageSuccess);
