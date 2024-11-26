'use strict';

function showNotification(message, isSuccess) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isSuccess ? 'success' : 'error';
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
    document.removeEventListener('click', handleClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
});

firstPromise
  .then((message) => showNotification(message, true))
  .catch((message) => showNotification(message, false));

secondPromise.then((message) => showNotification(message, true));

thirdPromise.then((message) => showNotification(message, true));

document.addEventListener('contextmenu', (e) => e.preventDefault());
