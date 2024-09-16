'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => reject(new Error(`First promise was rejected`)),
    3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const leftClick = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClick = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  Promise.all([leftClick, rightClick]).then(() => {
    resolve(`Third promise was resolved`);
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
