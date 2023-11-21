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

document.addEventListener('mouseup', (e) => {
  if (e.button === 0 || e.button === 2) {
    Promise.resolve('Second promise was resolved')
      .then(message => handleStatus(message, 'success'));
  }
});

const thirdPromise = new Promise((resolve, reject) => {
  let left;

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      left = true;
    } else if (e.button === 2 && left) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(message => handleStatus(message, 'success'))
  .catch(message => handleStatus(message, 'warning'));
