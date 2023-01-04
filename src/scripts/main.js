'use strict';

function createMessage(message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.textContent = message;

  notification.className = type;

  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(resolve => {
  let countLeft;
  let countRight;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      countLeft = true;
    }

    if (e.button === 2) {
      countRight = true;
    }

    if (countLeft && countRight) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => createMessage(result, 'success'))
  .catch(error => createMessage(error, 'warning'));

secondPromise
  .then(result => createMessage(result, 'success'));

thirdPromise
  .then(result => createMessage(result, 'success'));
