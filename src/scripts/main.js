'use strict';

const TIME_OUT = 3000;

let firstResolved = false;
let leftClicked = false;
let rightClicked = false;

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      firstResolved = true;

      resolve('First promise was resolved');
    },
    { once: true },
  );

  if (!firstResolved) {
    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, TIME_OUT);
  }
});
const promise2 = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');

      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);
});
const promise3 = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (rightClicked && leftClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

function addMessage(text, isSuccess = true) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isSuccess ? 'success' : 'error';
  notification.textContent = text;

  document.body.appendChild(notification);
}

promise1
  .then((message) => addMessage(message))
  .catch((error) => addMessage(error.message, false));

promise2
  .then((message) => addMessage(message))
  .catch((error) => addMessage(error.message, false));

promise3
  .then((message) => addMessage(message))
  .catch((error) => addMessage(error.message, false));
