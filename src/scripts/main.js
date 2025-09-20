'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0) {
        resolve('First promise was resolved');
        clearTimeout(timerId);
      }
    },
    { once: true },
  );
});

firstPromise.then(successMessage).catch(errorMessage);

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

secondPromise.then(successMessage);

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  function click(e) {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', click);
    }
  }

  document.addEventListener('mousedown', click);
});

thirdPromise.then(successMessage);

function successMessage(message) {
  const success = document.createElement('div');

  success.dataset.qa = 'notification';
  success.className = 'success';
  success.textContent = message;
  document.body.appendChild(success);
}

function errorMessage(message) {
  const error = document.createElement('div');

  error.dataset.qa = 'notification';
  error.className = 'error';
  error.textContent = message;
  document.body.appendChild(error);
}
