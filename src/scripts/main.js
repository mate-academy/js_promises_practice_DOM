/* eslint-disable prettier/prettier */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-shadow */
'use strict';

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.className = type;
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (event) => {
    if (event.button === 0) {
      document.removeEventListener('click', clickHandler);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    document.removeEventListener('click', clickHandler);
    reject('First promise was rejected');
  }, 3000);
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error, 'error'));

const secondPromise = new Promise((resolve) => {
  const clickHandler = (event) => {
    if (event.button === 0 || event.button === 2) {
      document.removeEventListener('click', clickHandler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);
});

secondPromise.then((message) => showNotification(message, 'success'));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const clickHandler = (event) => {
    if (event.button === 0) {
      leftClicked = true;
    }

    if (event.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('click', clickHandler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);
});

thirdPromise.then((message) => showNotification(message, 'success'));


document.addEventListener('contextmenu', (event) => event.preventDefault());
