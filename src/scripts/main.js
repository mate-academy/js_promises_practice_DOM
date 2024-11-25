'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  let leftButton;
  let rightButton;

  body.addEventListener('click', () => {
    leftButton = true;

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });

  body.addEventListener('contextmenu', () => {
    rightButton = true;

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

function successHandler(message) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">${message}</div>
  `);
}

function errorHandler(message) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">${message}</div>
  `);
}

promise1.then(successHandler, errorHandler);
promise2.then(successHandler);
promise3.then(successHandler);
