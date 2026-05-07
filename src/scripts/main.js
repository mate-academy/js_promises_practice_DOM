'use strict';

function showNotification(type, message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = type;
  notification.textContent = message;

  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timerId);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (event.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      isLeftClicked = true;
    }

    if (e.button === 2) {
      isRightClicked = true;
    }

    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => showNotification('success', message))
  .catch((error) => showNotification('error', error.message));

secondPromise
  .then((message) => showNotification('success', message))
  .catch((error) => showNotification('error', error.message));

thirdPromise
  .then((message) => showNotification('success', message))
  .catch((error) => showNotification('error', error.message));
