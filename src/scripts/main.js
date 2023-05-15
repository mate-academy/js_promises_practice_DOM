'use strict';

let leftClick = false;
let rightClick = false;

function showMessage(message, className) {
  const div = document.createElement('div');

  document.body.append(div);

  div.dataset.qa = 'notification';
  div.classList.add(className);
  div.textContent = message;
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      rightClick = (!rightClick && e.button === 2) ? true : rightClick;

      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (leftClick && rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => showMessage('First promise was resolved.', 'success'))
  .catch(() => showMessage('First promise was rejected.', 'warning'));

secondPromise
  .then(() => showMessage('Second promise was resolved.', 'success'));

thirdPromise
  .then(() => showMessage('Third promise was resolved.', 'success'));
