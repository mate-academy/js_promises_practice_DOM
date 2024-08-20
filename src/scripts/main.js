'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

function showNotification(message, isError = false) {
  const notification = document.querySelector('[data-qa="notification"]');

  if (notification) {
    notification.textContent = message;
    notification.className = isError ? 'error' : 'success';
  }
}

// Add handlers to promises
firstPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error.message, true));

secondPromise.then((message) => showNotification(message));

thirdPromise.then((message) => showNotification(message));
