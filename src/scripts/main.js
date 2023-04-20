'use strict';

const leftButton = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightButton = new Promise(resolve => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const firstPromise = new Promise((resolve, reject) => {
  leftButton.then(() => resolve(`First promise was resolved`));
  setTimeout(() => reject(new Error(`First promise was rejected`)), 3000);
});

const secondPromise = new Promise((resolve) => {
  leftButton.then(() => resolve(`Second promise was resolved`));
  rightButton.then(() => resolve(`Second promise was resolved`));
});

const thirdPromise = new Promise(resolve => {
  Promise.all([leftButton, rightButton])
    .then(() => resolve(`Third promise was resolved`));
});

const body = document.querySelector('body');

function handleSuccess(message) {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification">${message}</div>`);
}

function handleReject(message) {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification">${message}</div>`);
}

firstPromise
  .then(handleSuccess)
  .catch(handleReject);

secondPromise
  .then(handleSuccess);

thirdPromise
  .then(handleSuccess);
