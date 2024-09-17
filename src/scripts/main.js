'use strict';

const root = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  root.addEventListener('click', () => (
    resolve('First promise was resolved')
  ));

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  root.addEventListener('click', () => (
    resolve('Second promise was resolved')
  ));

  root.addEventListener('contextmenu', () => (
    resolve('Second promise was resolved')
  ));
});

const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  root.addEventListener('mouseup', (ev) => {
    if (ev.button === 0) {
      left = true;
    }

    if (ev.button === 2 || ev.button === 1) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  });
});

function addSucessMessage(message) {
  return root.insertAdjacentHTML('beforeend', (
    `<div data-qa="notification" class="success">
      ${message}
    </div>`
  ));
}

function addErrorMessage(message) {
  return root.insertAdjacentHTML('beforeend', (
    `<div data-qa="notification" class="error">
      ${message}
    </div>`
  ));
}

firstPromise
  .then(addSucessMessage, addErrorMessage);

secondPromise
  .then(addSucessMessage);

thirdPromise
  .then(addSucessMessage);
