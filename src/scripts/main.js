'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;
  const handleClick = (e) => {
    if (e.button === 0) {
      resolved = true;
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    if (!resolved) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const handleClick = (e) => {
    e.preventDefault();

    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const showNotification = (message, isError = false) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isError ? 'error' : 'success';
  notification.textContent = message;
  document.body.appendChild(notification);
};

firstPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error, true));

secondPromise.then((message) => showNotification(message));

thirdPromise.then((message) => showNotification(message));
