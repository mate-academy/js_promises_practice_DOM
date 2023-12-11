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

function waitFor(evt) {
  return new Promise(resolve => {
    bodyElement.addEventListener(evt, () => {
      resolve();
    });
  });
}

const firstPromise = new Promise((resolve, reject) => {
  bodyElement.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(result => {
    successMessage('First promise was resolved');
  })
  .catch(error => {
    errorMessage(error);
  });

const secondPromise = Promise.race([waitFor('click'), waitFor('contextmenu')]);

secondPromise
  .then(result => {
    successMessage('Second promise was resolved');
  });

const thirdPromise = Promise.all([waitFor('click'), waitFor('contextmenu')]);

thirdPromise
  .then(result => {
    successMessage('Third promise was resolved');
  });
