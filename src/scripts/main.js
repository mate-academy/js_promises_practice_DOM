'use strict';

const body = document.querySelector('body');

function handleStatus(message, className) {
  body.insertAdjacentHTML(
    'afterend',
    `<div data-qa="notification" class=${className}>${message}</div>`
  );
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(new Error(
    'First promise was rejected'
  )), 3000);
});

firstPromise
  .then(message => handleStatus(message, 'success'))
  .catch(message => handleStatus(message, 'warning'));

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then(message => handleStatus(message, 'success'));

const thirdPromise = new Promise((resolve, reject) => {
  let left, right;

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(message => handleStatus(message, 'success'))
  .catch(message => handleStatus(message, 'warning'));
