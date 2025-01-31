'use strict';

let leftClickHappened = false;
let rightClickHappened = false;

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  // eslint-disable-next-line no-shadow
  document.addEventListener('mousedown', (event) => {
    event.preventDefault();

    if (event.button === 0) {
      clearTimeout(timeout);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('mousedown', (event) => {
    event.preventDefault();

    if (event.button === 0 || event.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('mousedown', (event) => {
    event.preventDefault();

    if (event.button === 0) {
      leftClickHappened = true;
    }

    if (event.button === 2) {
      rightClickHappened = true;
    }

    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
    }
  });
});

const showNotification = (message, type) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = type;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const handleSuccess = (message) => showNotification(message, 'success');
const handleError = (message) => showNotification(message, 'error');

firstPromise.then(handleSuccess).catch(handleError);

secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);

// eslint-disable-next-line no-shadow
// document.addEventListener('contextmenu', (event) => event.preventDefault());
