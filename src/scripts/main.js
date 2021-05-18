'use strict';

const body = document.querySelector('body');

const p1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    resolve('First promise was resolved', 'success');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected', 'warning');
  }, 3000);
});

const p2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved', 'success');
    };
  });
});

const p3 = new Promise((resolve) => {
  let left = false;
  let right = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved', 'success');
    }
  });
});

p1.then(result => getNotification(result))
  .catch(error => getNotification(error));

p2.then(result => getNotification(result));

p3.then(result => getNotification(result));

const getNotification = (message, result) => {
  const newNotification = document.createElement('div');

  newNotification.setAttribute('data-qa', 'notification');
  newNotification.className = `${result}`;
  newNotification.textContent = `${message}`;

  body.append(newNotification);
};
