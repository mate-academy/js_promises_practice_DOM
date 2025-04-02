'use strict';
/* eslint-disable prefer-promise-reject-errors */

const createNotification = (message, type) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = message;
  document.querySelector('body').appendChild(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  const rejectTimeout = setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);

  document.querySelector('body').addEventListener('click', (ev) => {
    if (ev.button === 0) {
      clearTimeout(rejectTimeout);
      resolve('First promise was resolved');
    }
  });
});

firstPromise
  .then((message) => createNotification(message, 'success'))
  .catch((message) => createNotification(message, 'error'));

const secondPromise = new Promise((resolve) => {
  const handler = (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      document.querySelector('body').removeEventListener('mousedown', handler);
      resolve('Second promise was resolved');
    }
  };

  document.querySelector('body').addEventListener('mousedown', handler);
});

secondPromise
  .then((message) => createNotification(message, 'success'))
  .catch((message) => createNotification(message, 'error'));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handler = (ev) => {
    if (ev.button === 0) {
      leftClicked = true;
    }

    if (ev.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.querySelector('body').removeEventListener('click', handler);
      resolve('Third promise was resolved');
    }
  };

  document.querySelector('body').addEventListener('click', handler);
});

thirdPromise
  .then((message) => createNotification(message, 'success'))
  .catch((message) => createNotification(message, 'error'));
