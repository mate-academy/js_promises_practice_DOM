'use strict';

const body = document.querySelector('body');
let leftClick = false;
let rightClick = false;

function showNotification(message, isSuccess = true) {
  const notification = document.createElement('div');

  notification.classList.add(isSuccess ? 'success' : 'error');
  notification.textContent = message;
  notification.setAttribute('data-qa', 'notification');
  body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    const err = 'First promise was rejected';

    reject(err);
  }, 3000);

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clearTimeout(timer);

      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick || rightClick) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((result) => {
    showNotification(result, true);
  })
  .catch((error) => {
    showNotification(error, false);
  });

secondPromise.then((result) => {
  showNotification(result, true);
});

thirdPromise.then((result) => {
  showNotification(result, true);
});

document.addEventListener('contextmenu', (e) => e.preventDefault());
