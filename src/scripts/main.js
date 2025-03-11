/* eslint-disable prefer-promise-reject-errors */
'use strict';

let leftClick = false;
let rightClick = false;

function displayPromiseResult(promiseObj) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="${promiseObj.class}">${promiseObj.message}</div>`,
  );
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve({
      class: 'success',
      message: 'First promise was resolved on a left click in the document',
    });
  });

  setTimeout(() => {
    reject({
      class: 'error',
      message: 'First promise was rejected in 3 seconds if not clicked',
    });
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve({
        class: 'success',
        message: 'Second promise was resolved',
      });
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve({
        class: 'success',
        message: 'Third promise was resolved',
      });
    }
  });
});

firstPromise
  .then((successObj) => displayPromiseResult(successObj))
  .catch((errorObj) => displayPromiseResult(errorObj));
secondPromise.then((successObj) => displayPromiseResult(successObj));
thirdPromise.then((successObj) => displayPromiseResult(successObj));
