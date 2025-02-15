'use strict';

function showNotification(message, isSuccess = true) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isSuccess ? 'success' : 'error';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

let leftClickHappened = false;
let rightClickHappened = false;

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        clearTimeout(timeout);
        resolve('First promise was resolved on a left click in the document');
      }
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => resolve('Second promise was resolved'),
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClickHappened = true;
    }

    if (e.button === 2) {
      rightClickHappened = true;
    }

    if (leftClickHappened && rightClickHappened) {
      resolve(
        'Third promise was resolved only after both' +
          'left and right clicks happened',
      );
    }
  });
});

firstPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error, false));
secondPromise.then((message) => showNotification(message));
thirdPromise.then((message) => showNotification(message));
