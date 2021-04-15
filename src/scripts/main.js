'use strict';

const body = document.querySelector('body');

const createMessage = (className, text) => {
  const message = document.createElement('div');

  message.className = className;
  message.dataset.qa = 'notification';
  message.innerText = text;

  return message;
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => resolve());

  setTimeout(() => reject(new Error()), 3000);
});

firstPromise
  .then(() => body.append(
    createMessage('success', 'First promise was resolved')))
  .catch(() => body.append(
    createMessage('warning', 'First promise was rejected')));

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', ({ button }) => {
    if (button === 0 || button === 2) {
      resolve();
    }
  });
});

secondPromise.then(() => body.append(
  createMessage('success', 'Second promise was resolved')));

const thirdPromise = new Promise((resolve, reject) => {
  let leftPressed = false;
  let rightPressed = false;

  document.addEventListener('mousedown', ({ button }) => {
    switch (button) {
      case 2:
        leftPressed = true;
        break;

      case 0:
        rightPressed = true;
    }

    if (leftPressed && rightPressed) {
      resolve();
    }
  });
});

thirdPromise.then(() => body.append(
  createMessage('success', 'Third promise was resolved')));
