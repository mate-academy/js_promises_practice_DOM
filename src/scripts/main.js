/* eslint-disable prefer-promise-reject-errors */
'use strict';

const body = document.querySelector('body');

const notification = (message, type) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type === 'success' ? 'success' : 'error');
  div.innerText = message;

  body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

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

firstPromise
  .then((message) => notification(message, 'success'))
  .catch((message) => notification(message, 'error'));

secondPromise
  .then((message) => notification(message, 'success'))
  .catch((message) => notification(message, 'error'));

thirdPromise
  .then((message) => notification(message, 'success'))
  .catch((message) => notification(message, 'error'));
