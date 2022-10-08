'use strict';

const body = document.body;

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', e => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    body.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });
});

function showMessage(message, className) {
  body.insertAdjacentHTML('beforeend', `
    <div class="${className}" data-qa="notification">
      ${message}
    </div>
  `);
}

firstPromise
  .then(success => showMessage(success, 'message success'))
  .catch(error => showMessage(error, 'message warning'));

secondPromise
  .then(success => showMessage(success, 'message success'))
  .catch(error => showMessage(error, 'message warning'));

thirdPromise
  .then(success => showMessage(success, 'message success'))
  .catch(error => showMessage(error, 'message warning'));
