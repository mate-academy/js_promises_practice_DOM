/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
  function handleClick(event) {
    if (event.button === 0) {
      document.removeEventListener('click', handleClick);
      resolve('First promise was resolved');
    }
  }

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  function handleClick() {
    document.removeEventListener('click', handleClick);
    resolve('Second promise was resolved');
  }

  document.addEventListener('click', handleClick);
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  function handleClick(event) {
    if (event.button === 0) {
      leftClick = true;
    }

    if (event.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('click', handleClick);
      resolve('Third promis was resolved');
    }

    document.addEventListener('click', handleClick);
  }
});

function showNotification(message, isError = false) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isError ? 'error' : 'success';
  notification.textContent = message;
  document.body.appendChild(notification);
}

firstPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error, true));

secondPromise.then((message) => showNotification(message));

thirdPromise.then((message) => showNotification(message));
