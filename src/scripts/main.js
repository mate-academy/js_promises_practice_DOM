'use strict';

const body = document.querySelector('body');

function createMessage(number, type, nextPromise) {
  const message = document.createElement('div');

  body.insertAdjacentElement('afterbegin', message);

  message.dataset.qa = 'notification';

  if (type === 'warning') {
    message.classList.add(type);
    message.textContent = `${number} promise was rejected`;
  }

  if (type === 'success') {
    message.classList.add(type);
    message.textContent = `${number} promise was resolved`;
  }

  return nextPromise;
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error()), 3000);
  body.addEventListener('mousedown', () => resolve());
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve();
    }
  });
});

firstPromise
  .then(() => createMessage('First', 'success', secondPromise),
    () => createMessage('First', 'warning', secondPromise))
  .then(() => createMessage('Second', 'success', thirdPromise))
  .then(() => createMessage('Third', 'success'));
