'use strict';

const body = document.querySelector('body');

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

let rightClick = false;
let leftClick = false;

const showMessage = (className, text) => {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="${className}">
      ${text}
    </div>`
  );
};

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    leftClick = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', () => {
    rightClick = true;
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  body.addEventListener('mouseup', () => {
    if (rightClick === true && leftClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

const promiseResult = (promise) => {
  promise
    .then(result => showMessage('success', result))
    .catch(error => showMessage('warning', error));
};

promiseResult(firstPromise);
promiseResult(secondPromise);
promiseResult(thirdPromise);
