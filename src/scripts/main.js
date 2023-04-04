'use strict';

function successHandler(result) {
  const success = document.createElement('div');

  success.innerHTML = `
  <div data-qa="notification" class="success">
    ${result}
  </div>
  `;

  document.body.append(success);
}

function errorHandler() {
  const error = document.createElement('div');

  error.innerHTML = `
  <div data-qa="notification" class="warning">
    First promise was rejected
  </div>
  `;

  document.body.append(error);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const tirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(successHandler)
  .catch(errorHandler);

secondPromise
  .then(successHandler);

tirdPromise
  .then(successHandler);
