'use strict';

const successEl = (message) =>
  `<div data-qa="notification" class="success">${message}</div>`;
const errorEl = (message) =>
  `<div data-qa="notification" class="error">${message}</div>`;

const displayMessage = (message) => {
  const body = document.querySelector('body');

  body.insertAdjacentHTML('beforeend', message);
};

const promise1 = Promise.race([
  new Promise((resolve) => {
    const handleClick = () => {
      resolve(successEl('First promise was resolved'));
      document.removeEventListener('click', handleClick);
    };

    document.addEventListener('click', handleClick);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(errorEl('First promise was rejected'));
    }, 3000);
  }),
]);

const promise2 = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(successEl('Second promise was resolved'));
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

let leftClick = false;
let rightClick = false;

const promise3 = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(successEl('Third promise was resolved'));
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

promise1.then(displayMessage).catch(displayMessage);
promise2.then(displayMessage);
promise3.then(displayMessage);
