'use strict';

const body = document.querySelector('body');

const promiseOne = new Promise((resolve, reject) => {
  const mouseDown = (e) => {
    clearTimeout(rejectionTime);
    resolve(`First promise was resolved`);
    document.removeEventListener('mousedown', mouseDown);
  };

  document.addEventListener('mousedown', mouseDown);

  const rejectionTime = setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const promiseTwo = new Promise((resolve, reject) => {
  let isResolved = false;

  const mouseDown = (e) => {
    if ((e.button === 0 || e.button === 2) && !isResolved) {
      resolve(`Second promise was resolved`);
      isResolved = true;
      document.removeEventListener('mousedown', mouseDown);
    }
  };

  document.addEventListener('mousedown', mouseDown);
});

const promiseThree = new Promise((resolve, reject) => {
  let leftMouse = false;
  let rightMouse = false;
  let isResolved = false;

  const mouseDown = (e) => {
    if (e.button === 0) {
      leftMouse = true;
    }

    if (e.button === 2) {
      rightMouse = true;
    }

    if (leftMouse && rightMouse && !isResolved) {
      isResolved = true;
      resolve(`Third promise was resolved`);
      document.removeEventListener('mousedown', mouseDown);
    }
  };

  document.addEventListener('mousedown', mouseDown);
});

function notificationHandler(type, message) {
  const div = document.createElement('div');

  div.classList.add('notification', type);
  div.dataset.qa = 'notification';
  div.textContent = message;

  body.appendChild(div);
}

promiseOne
  .then((message) => notificationHandler('success', message))
  .catch((message) => notificationHandler('error', message));

promiseTwo.then((message) => notificationHandler('success', message));

promiseThree.then((message) => notificationHandler('success', message));
