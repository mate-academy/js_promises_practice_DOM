'use strict';

document.addEventListener('contextmenu', (e) => e.preventDefault());

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = message;
  div.classList.add(isError ? 'error' : 'success');
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const onMouseDown = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);

  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('mousedown', onMouseDown);
  }, 3000);
});

firstPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

const secondPromise = new Promise((resolve) => {
  const onMouseDown = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

secondPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const onMouseDownThird = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    Promise.resolve().then(() => {
      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        document.removeEventListener('mousedown', onMouseDownThird);
      }
    });
  };

  document.addEventListener('mousedown', onMouseDownThird);
});

thirdPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));
