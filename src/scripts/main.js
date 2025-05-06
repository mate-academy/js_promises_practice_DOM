'use strict';

function notify(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type === 'success' ? 'success' : 'error');
  div.textContent = message;
  document.body.appendChild(div);
}

let firstResolved = false;

const firstPromise = new Promise((resolve, reject) => {
  const handler = (e) => {
    if (e.button === 0) {
      firstResolved = true;
      resolve('First promise was resolved on a left click in the document');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);

  setTimeout(() => {
    if (!firstResolved) {
      reject(
        new Error('First promise was rejected in 3 seconds if not clicked')
      );
      document.removeEventListener('mousedown', handler);
    }
  }, 3000);
});

firstPromise
  .then((msg) => notify(msg, 'success'))
  .catch((err) => notify(err.message, 'error'));

let secondResolved = false;

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (!secondResolved && (e.button === 0 || e.button === 2)) {
      secondResolved = true;
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

secondPromise
  .then((msg) => notify(msg, 'success'))
  .catch((err) => notify(err.message, 'error'));

let leftClicked = false;
let rightClicked = false;
let thirdResolved = false;

const thirdPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked && !thirdResolved) {
      thirdResolved = true;
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

thirdPromise
  .then((msg) => notify(msg, 'success'))
  .catch((err) => notify(err.message, 'error'));

document.addEventListener('contextmenu', (e) => e.preventDefault());
