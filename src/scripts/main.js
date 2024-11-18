'use strict';

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = type;
  notification.textContent = message;
  document.body.appendChild(notification);
}

const firstPromise = new Promise(function (resolve, reject) {
  document.addEventListener('click', () => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });

  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error, 'error'));

const secondPromise = new Promise(function (resolve, reject) {
  document.addEventListener('click', (events) => {
    if (events.button === 0 || events.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => showNotification(message, 'success'));

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (events) => {
    if (events.button === 0) {
      leftClick = true;
    }

    if (events.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => showNotification(message, 'success'));
