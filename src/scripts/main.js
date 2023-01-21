'use strict';

const body = document.querySelector('body');
let rightClick = false;
let leftClick = false;

body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const showMessage = (className, text) => {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="${className}">
      ${text}
    </div>`
  );
};

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      rightClick = true;
    }

    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  body.addEventListener('mouseup', () => {
    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

const promiseResult = (promise) => {
  promise
    .then(result => showMessage('success', result))
    .catch(error => showMessage('error', error));
};

promiseResult(firstPromise);
promiseResult(secondPromise);
promiseResult(thirdPromise);
