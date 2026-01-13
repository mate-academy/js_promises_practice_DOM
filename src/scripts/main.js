'use strict';

function showMessage(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isError ? 'error' : 'success';
  div.textContent = message;

  document.body.appendChild(div);
}

// --------------------
// First Promise
// --------------------
const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        clearTimeout(timerId);

        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

firstPromise
  .then((message) => showMessage(message))
  .catch((error) => showMessage(error.message, true));

// --------------------
// Second Promise
// --------------------
const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

secondPromise.then((message) => showMessage(message));

// --------------------
// Third Promise
// --------------------
const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  function onMouseDown(e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', onMouseDown);
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('mousedown', onMouseDown);
});

thirdPromise.then((message) => showMessage(message));
