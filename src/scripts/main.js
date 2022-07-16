'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  });
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener((element) => {
    if (element.button === 0 || element.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (element) => {
    if (element.button === 0) {
      body.addEventListener('mousedown', (el) => {
        if (el.button === 2) {
          resolve('Third promise was resolved');
        }
      });
    }

    if (element.button === 2) {
      body.addEventListener('mousedown', (el) => {
        if (el.button === 0) {
          resolve('Third promise was resolved');
        }
      });
    }
  });
});

function onSuccess(message) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      ${message}
    </div>
  `);
}

function onWarning(message) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${message}
    </div>
  `);
}

firstPromise
  .then(onSuccess)
  .catch(onWarning);

secondPromise
  .then(onSuccess)
  .then(onSuccess);

thirdPromise
  .then(onSuccess);
