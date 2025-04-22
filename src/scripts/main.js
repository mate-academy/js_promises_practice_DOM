'use strict';

// FIRST PROMISE
let firstResolved = false;

const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = () => {
    firstResolved = true;
    resolve('First promise was resolved');
  };

  document.addEventListener('click', clickHandler, { once: true });

  setTimeout(() => {
    if (!firstResolved) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

// SECOND PROMISE
const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

// THIRD PROMISE
let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

// UTILITY FUNCTION FOR NOTIFICATIONS
function showNotification(message, isSuccess = true) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isSuccess ? 'success' : 'error';
  div.textContent = message;
  document.body.appendChild(div);
}

// HANDLERS FOR PROMISES
firstPromise
  .then((msg) => showNotification(msg, true))
  .catch((err) => showNotification(err.message, false));

secondPromise
  .then((msg) => showNotification(msg, true))
  .catch((err) => showNotification(err.message, false)); // just in case

thirdPromise
  .then((msg) => showNotification(msg, true))
  .catch((err) => showNotification(err.message, false)); // just in case

// Optional: Prevent right-click menu (for better UX)
document.addEventListener('contextmenu', (e) => e.preventDefault());
