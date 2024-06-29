'use strict';

const body = document.querySelector('body');
const div = document.createElement('div');
let leftClickHappened = false;
let rightClickHappened = false;

div.setAttribute('data-qa', 'notification');
body.appendChild(div);

const showNotification = (message, type) => {
  const notification = document.createElement('div');

  notification.className = type;
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  body.appendChild(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  const handleLeftClick = (e) => {
    if (e.button === 0) {
      resolve(`First promise was resolved`);
      document.removeEventListener('mouseup', handleLeftClick);
    }
  };

  document.addEventListener('mouseup', handleLeftClick);

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
    document.removeEventListener('mouseup', handleLeftClick);
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
      document.removeEventListener('mouseup', handleClick);
    }
  };

  document.addEventListener('mouseup', handleClick);
});

const thirdPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftClickHappened = true;
    }

    if (e.button === 2) {
      rightClickHappened = true;
    }

    if (leftClickHappened && rightClickHappened) {
      resolve(`Third promise was resolved`);
      document.removeEventListener('mouseup', handleClick);
    }
  };

  document.addEventListener('mouseup', handleClick);
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

secondPromise.then((message) => showNotification(message, 'success'));

thirdPromise.then((message) => showNotification(message, 'success'));
