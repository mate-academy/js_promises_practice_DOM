'use strict';

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isError ? 'notification error' : 'notification success';
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  const clickHandler = (e) => {
    if (e.button === 0) {
      resolved = true;
      resolve('First promise was resolved on a left click in the document');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    if (!resolved) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', clickHandler);
    }
  }, 3000);
});

firstPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    }
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

secondPromise.then((msg) => showNotification(msg));

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

      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);

      leftClicked = false;
      rightClicked = false;
    }
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

thirdPromise.then((msg) => showNotification(msg));

document.addEventListener('contextmenu', (e) => e.preventDefault());
