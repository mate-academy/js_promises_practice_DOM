'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

function createNotification(message, isSuccess) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  notification.classList.add('notification');
  notification.classList.add(isSuccess ? 'success' : 'error');

  document.body.appendChild(notification);
}

firstPromise
  .then((message) => createNotification(message, true))
  .catch((error) => createNotification(error.message, false));

secondPromise
  .then((message) => createNotification(message, true))
  .catch((error) => createNotification(error.message, false));

thirdPromise
  .then((message) => createNotification(message, true))
  .catch((error) => createNotification(error.message, false));
