/* eslint-disable no-shadow */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.documentElement.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  // eslint-disable-next-line prefer-promise-reject-errors
  window.setTimeout(() => reject('First promise was rejected'), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const a = new Promise((resolve) => {
    document.documentElement.addEventListener('click', () => {
      resolve();
    });
  });

  const b = new Promise((resolve) => {
    document.documentElement.addEventListener('contextmenu', () => {
      resolve();
    });
  });

  const result = Promise.race([a, b]);

  result.finally(() => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise((resolve, reject) => {
  const a = new Promise((resolve) => {
    document.documentElement.addEventListener('click', () => {
      resolve();
    });
  });

  const b = new Promise((resolve) => {
    document.documentElement.addEventListener('contextmenu', () => {
      resolve();
    });
  });

  const result = Promise.all([a, b]);

  result.finally(() => resolve('Third promise was resolved'));
});

function success(message) {
  const newDiv = document.createElement('div');

  newDiv.dataset.qa = 'notification';
  newDiv.className = 'success';
  newDiv.append(message);
  document.body.append(newDiv);
}

function error(message) {
  const newDiv = document.createElement('div');

  newDiv.dataset.qa = 'notification';
  newDiv.className = 'error';
  newDiv.append(message);
  document.body.append(newDiv);
}

firstPromise.then(
  (successMessage) => success(successMessage),
  (errorMessage) => error(errorMessage),
);

secondPromise.then(
  (successMessage) => success(successMessage),
  (errorMessage) => error(errorMessage),
);

thirdPromise.then(
  (successMessage) => success(successMessage),
  (errorMessage) => error(errorMessage),
);
