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

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => resolve('First promise was resolved'));
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const clickPromise = new Promise(resolve => {
  body.addEventListener('click', () => {
    resolve();
  });
});

const contextMenuPromise = new Promise(resolve => {
  body.addEventListener('contextmenu', () => {
    resolve();
  });
});

const secondPromise = new Promise((resolve, reject) => {
  Promise.race([clickPromise, contextMenuPromise])
    .then((value) => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise(resolve => {
  Promise.all([clickPromise, contextMenuPromise])
    .then((value) => resolve('Third promise was resolved'));
});

firstPromise.then(successHandler, errorHandler);
secondPromise.then(successHandler, errorHandler);
thirdPromise.then(successHandler, errorHandler);
