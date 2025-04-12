'use strict';

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isError ? 'error' : 'success';
  div.textContent = message;
  document.body.appendChild(div);
}

let leftClicked = false;
let rightClicked = false;

// --- First Promise ---
const firstPromise = new Promise((resolve, reject) => {
  const leftClickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', leftClickHandler);
    }
  };

  document.addEventListener('click', leftClickHandler);

  setTimeout(() => {
    if (!leftClicked) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', leftClickHandler);
    }
  }, 3000);
});

firstPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

// --- Second Promise (never rejects) ---
const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

secondPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

// --- Third Promise ---
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

thirdPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));
