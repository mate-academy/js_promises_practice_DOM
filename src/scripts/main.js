'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
  setTimeout(() => reject(new Error(`First promise was rejected`)), 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = Promise.all([
  new Promise(resolve => {
    body.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  }),

  new Promise(resolve => {
    body.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      resolve();
    });
  }),
]);

firstPromise
  .then(message => getMessage('success', message))
  .catch(error => getMessage('warning', error));

secondPromise
  .then(message => getMessage('success', message));

thirdPromise.then(message => getMessage('success', message));

function getMessage(classOfMessage, message) {
  body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class=${classOfMessage}>
  ${message}
  </div>
  `);
}
