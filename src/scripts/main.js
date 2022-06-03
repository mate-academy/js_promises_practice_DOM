'use strict';

const body = document.body;

let clickCount = 0;

let leftClick;
let rightClick;

function pushNotification(message, className) {
  body.insertAdjacentHTML('afterbegin', `
    <div class=${className}>${message}</div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', e => {
    clickCount++;

    if (clickCount >= 1) {
      resolve('First promise was resolved');
      clickCount = 0;
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(resolve => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick === rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => pushNotification(result, 'success'))
  .catch(error => pushNotification(error, 'warning'));

secondPromise
  .then(result => pushNotification(result, 'success'));

thirdPromise
  .then(result => pushNotification(result, 'success'));
