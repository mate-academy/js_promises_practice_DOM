/* eslint-disable prefer-promise-reject-errors */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler);

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;
  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

const showNotification = (message, isError = false) => {
  const notification = document.createElement('div');

  notification.classList.add('notification');
  notification.classList.add(isError ? 'error' : 'success');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  document.body.append(notification);
};

firstPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error, true));
secondPromise.then((message) => showNotification(message));
thirdPromise.then((message) => showNotification(message));

document.addEventListener('contextmenu', (e) => e.preventDefault());
