'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

let firstClick = false;
let secondClick = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    firstClick = true;

    if (firstClick && secondClick) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', () => {
    secondClick = true;

    if (firstClick && secondClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => createMessage(`First promise was resolved`, 'success'))
  .catch((text) => createMessage(text, 'warning'));

secondPromise
  .then(() => createMessage(`Second promise was resolved`, 'success'));

thirdPromise
  .then(() => createMessage('Third promise was resolved', 'success'));

function createMessage(text, className) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = className;
  div.textContent = text;

  body.appendChild(div);
}
