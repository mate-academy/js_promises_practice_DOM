'use strict';

const notification = (message, isSuccess = true) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isSuccess ? 'success' : 'error';
  div.textContent = message;
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const onMouseDown = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
      clearTimeout(timeout);
    }
  };

  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
    document.removeEventListener('mousedown', onMouseDown);
  }, 3000);

  document.addEventListener('mousedown', onMouseDown);
});

firstPromise
  .then((msg) => notification(msg, true))
  .catch((err) => notification(err, false));

const secondPromise = new Promise((resolve) => {
  const onMouseDown = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

secondPromise.then((msg) => notification(msg, true));

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const onMouseDown = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

thirdPromise.then((msg) => notification(msg, true));

document.addEventListener('contextmenu', (e) => e.preventDefault());
