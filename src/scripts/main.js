'use strict';

const body = document.querySelector('body');

function createMessage(type, text) {
  body.insertAdjacentHTML('beforeend', `<div data-qa="notification"
      class="message ${type}">
      ${text}
    </div>`);
}

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftButton = false;
  let rightButton = false;

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    };

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => {
    createMessage('success-first', result);
  })
  .catch(error => {
    createMessage('warning', error);
  });

secondPromise
  .then(result => {
    createMessage('success-second', result);
  });

thirdPromise
  .then(result => {
    createMessage('success-third', result);
  });
