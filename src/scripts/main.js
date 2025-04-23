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
  const onClick = (eve) => {
    if (eve.button === 0) {
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
  const onMouseDown = (eve) => {
    if (eve.button === 0 || eve.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

const thirdPromise = new Promise((resolve) => {
  const onMouseDown = (eve) => {
    if (eve.button === 0) {
      leftClicked = true;
    }

    if (eve.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved ');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
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

document.addEventListener('contextmenu', (e) => e.preventDefault());
