'use strict';

const body = document.querySelector('body');

const successHandler = (message) => {
  body.insertAdjacentHTML('beforeend',
    `<div class="success" data-qa="notification">${message}</div>`);
};

const errorHandler = (message) => {
  body.insertAdjacentHTML('beforeend',
    `<div class="warning" data-qa="notification">${message}</div>`);
};

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => resolve('First promise was resolved'));
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const promise2 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => resolve((
    'Second promise was resolved')));

  body.addEventListener('contextmenu', () => resolve((
    'Second promise was resolved')));
});

const promise3 = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  body.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  body.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise1.then(successHandler, errorHandler);
promise2.then(successHandler, errorHandler);
promise3.then(successHandler, errorHandler);
