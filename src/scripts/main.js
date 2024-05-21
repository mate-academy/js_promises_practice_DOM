'use strict';

const logo = document.querySelector('.logo');

logo.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const pushNotification = (message, type) => {
  const notificationElement = document.createElement('div');
  const messageElement = document.createElement('p');

  notificationElement.classList.add('notification', type);
  notificationElement.setAttribute('data-qa', 'notification');
  messageElement.textContent = message;
  notificationElement.appendChild(messageElement);
  document.body.appendChild(notificationElement);

  setTimeout(() => {
    notificationElement.style.visibility = 'hidden';
  }, 2000);
};

const firstPromise = new Promise((resolve, reject) => {
  let clicked = null;
  const timeoutId = setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  logo.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clicked = true;
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  logo.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftCliked = false;
  let rightCliked = false;

  logo.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftCliked = true;
    } else if (e.button === 2) {
      rightCliked = true;
    }

    if (leftCliked && rightCliked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => pushNotification(message, 'success'))
  .catch((error) => pushNotification(error.message, 'error'));

secondPromise.then((message) => pushNotification(message, 'success'));

thirdPromise.then((message) => pushNotification(message, 'success'));
