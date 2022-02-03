'use strict';

const body = document.body;

function onSuccess(message) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      ${message}
    </div>
  `);
}

function onError(message) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${message}
    </div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftButton = false;
  let rightButton = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve(`Third promise was resolved`);
    }
  });
});

firstPromise
  .then(onSuccess)
  .catch(onError);

secondPromise
  .then(onSuccess)
  .then(onSuccess);

thirdPromise
  .then(onSuccess);
