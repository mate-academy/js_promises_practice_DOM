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

const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);

  setTimeout(() => {
    if (!leftClicked) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('mousedown', clickHandler);
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

const thirdPromise = new Promise((resolve) => {
  function checkBothClicks() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  }

  function handler(e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }
    checkBothClicks();
  }

  document.addEventListener('mousedown', handler);
});

firstPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

secondPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

thirdPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));
