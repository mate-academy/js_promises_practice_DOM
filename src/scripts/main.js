'use strict';

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = message;

  document.body.append(notification);
}

// FIRST PROMISE
const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timeout);
      resolve('First promise was resolved');
    }
  });
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

// SECOND PROMISE
const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

secondPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

// THIRD PROMISE
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));
