'use strict';

const body = document.querySelector('body');

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
    };
  });

  body.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    };
  });
});

const successful = (message) => {
  body.insertAdjacentHTML('beforeend',
    `<div class="success" data-qa="notification">${message}</div>`);
};

const error = (message) => {
  body.insertAdjacentHTML('beforeend',
    `<div class="warning" data-qa="notification">${message}</div>`);
};

promise1.then(successful, error);
promise2.then(successful, error);
promise3.then(successful, error);
