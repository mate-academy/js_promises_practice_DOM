'use strict';

const body = document.querySelector('body');

const message = (text, className) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = className;
  div.innerText = text;
  body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(result => message(result, 'success'))
  .catch((error) => message(error, 'warning'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then(result => message(result, 'success'));

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    let leftButton = false;
    let rightButton = false;

    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(result => message(result, 'succeess'));
