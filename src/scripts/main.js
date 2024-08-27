'use strict';

let isLMBPressed = false;
let isRMBPressed = false;

const showNotification = (message, isError = false) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isError ? 'error' : 'success';
  notification.textContent = message;

  document.body.appendChild(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    isLMBPressed = true;
    resolve('First promise was resolved');
  });

  // eslint-disable-next-line prefer-promise-reject-errors
  setTimeout(() => reject('First promise was rejected'), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    isLMBPressed = true;
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    isRMBPressed = true;
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  const checkBothButtonsPressed = () => {
    if (isLMBPressed && isRMBPressed) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    isLMBPressed = true;
    checkBothButtonsPressed();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    isRMBPressed = true;
    checkBothButtonsPressed();
  });
});

firstPromise.then(
  (message) => showNotification(message, false),
  (message) => showNotification(message, true),
);

secondPromise.then((message) => showNotification(message, false));
thirdPromise.then((message) => showNotification(message, false));
