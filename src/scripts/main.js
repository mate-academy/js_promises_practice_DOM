/* eslint-disable prefer-promise-reject-errors */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let flagLeft = false;
  let flagRight = false;

  document.addEventListener('click', () => {
    if (flagRight) {
      resolve('Third promise was resolved');
    }

    flagLeft = true;
  });

  document.addEventListener('contextmenu', () => {
    if (flagLeft) {
      resolve('Third promise was resolved');
    }

    flagRight = true;
  });
});

const success = (message) => {
  const div = document.createElement('div');

  div.className = 'success';
  div.dataset.qa = 'notification';
  div.textContent = message;
  document.body.appendChild(div);
};

const error = (message) => {
  const div = document.createElement('div');

  div.className = 'error';
  div.dataset.qa = 'notification';
  div.textContent = message;
  document.body.appendChild(div);
};

firstPromise
  .then((message) => success(message))
  .catch((message) => error(message));

secondPromise
  .then((message) => success(message))
  .catch((message) => error(message));

thirdPromise
  .then((message) => success(message))
  .catch((message) => error(message));
