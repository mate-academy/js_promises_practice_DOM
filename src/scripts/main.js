'use strict';

function showNotification(message, isSuccess) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isSuccess ? 'success' : 'error';
  notification.textContent = message;

  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const clickHandler = (e) => {
    if (e.button === 0) {
      clearTimeout(timeout);
      document.removeEventListener('click', clickHandler);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);
});

firstPromise
  .then((message) => showNotification(message, true))
  .catch((error) => showNotification(error.message, false));

const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', clickHandler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

secondPromise
  .then((message) => showNotification(message, true))
  .catch((error) => showNotification(error.message, false));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', handler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

thirdPromise
  .then((message) => showNotification(message, true))
  .catch((error) => showNotification(error.message, false));

// Вимикаємо контекстне меню при правому кліку
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
