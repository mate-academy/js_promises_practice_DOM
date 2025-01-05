'use strict';

function createNotification(message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  const onClick = (e) => {
    if (e.button === 0) {
      clicked = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', onClick);
    }
  }, 3000);
});

firstPromise
  .then((message) => createNotification(message, 'success'))
  .catch((message) => createNotification(message, 'error'));

const secondPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);
});

secondPromise.then((message) => createNotification(message, 'success'));

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);
});

thirdPromise.then((message) => createNotification(message, 'success'));

document.addEventListener('contextmenu', (e) => e.preventDefault());
