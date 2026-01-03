'use strict';

const body = document.querySelector('body');
let rightClick = false;
let leftClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
    clearTimeout(tmout);
    leftClick = true;
  });

  const tmout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    clearTimeout(tmout);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }

    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('mousedown', handleClick);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleClick);
});

const resultHandler = function (promise) {
  return promise
    .then((message) => {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div data-qa="notification" class="success">${message}</div>`,
      );
    })
    .catch((error) => {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div data-qa="notification" class="error">${error.message}</div>`,
      );
    });
};

resultHandler(firstPromise);
resultHandler(secondPromise);
resultHandler(thirdPromise);
