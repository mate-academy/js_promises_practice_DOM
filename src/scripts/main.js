/* eslint-disable no-console */
'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
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
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function successHandler(message) {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  body.appendChild(div);
}

function errorHandler(err) {
  const div = document.createElement('div');

  div.classList.add('error');
  div.setAttribute('data-qa', 'notification');
  div.textContent = err.message;

  body.appendChild(div);
}

firstPromise
  .then((message) => {
    successHandler(message);
  })
  .catch((err) => {
    errorHandler(err);
  });

secondPromise.then((message) => {
  successHandler(message);
});

thirdPromise.then((message) => {
  successHandler(message);
});
