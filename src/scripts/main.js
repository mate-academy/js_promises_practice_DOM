'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', onClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0 || event.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);
});

let leftClickHappened = false;
let rightClickHappened = false;

const thirdPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0) {
      leftClickHappened = true;
    }

    if (e.button === 2) {
      rightClickHappened = true;
    }

    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);
});

function showNotification(type, message) {
  const notification = document.createElement('div');

  notification.classList.add(
    'notification',
    type === 'success' ? 'success' : 'error',
  );
  notification.textContent = message;
  notification.setAttribute('data-qa', 'notification');

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

firstPromise
  .then((message) => showNotification('success', message))
  .catch((error) => showNotification('error', error));

secondPromise.then((message) => showNotification('success', message));

thirdPromise.then((message) => showNotification('success', message));

document.addEventListener('contextmenu', (e) => e.preventDefault());
