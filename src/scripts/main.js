'use strict';

const bodyElement = document.querySelector('body');

function successMessage(message) {
  bodyElement.insertAdjacentHTML('afterbegin', `
    <div class="success" data-qa="notification">
      ${message}
    <div>
    `);
}

function errorMessage(message) {
  bodyElement.insertAdjacentHTML('afterbegin', `
    <div class="warning" data-qa="notification">
      ${message}
    <div>
    `);
}

const firstPromise = new Promise((resolve, reject) => {
  bodyElement.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  bodyElement.addEventListener('mousedown', (evt) => {
    if (evt.button === 0 || evt.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  bodyElement.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

firstPromise
  .then(result => {
    successMessage(result);
  })
  .catch(error => {
    errorMessage(error);
  });

secondPromise
  .then(result => {
    successMessage(result);
  });

// thirdPromise
//   .then(result => {
//     successMessage(result);
//   });
