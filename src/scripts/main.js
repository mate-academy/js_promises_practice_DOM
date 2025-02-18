'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        clearInterval(timer);
        resolve('First promise was resolved on a left click in the document');
      }
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
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
});

function showNotifications(message, isError = false) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isError ? 'error' : 'success';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

firstPromise
  .then((message) => showNotifications(message))
  .catch((error) => showNotifications(error.message, true));
secondPromise.then((message) => showNotifications(message));
thirdPromise.then((message) => showNotifications(message));

document.addEventListener('contextmenu', (e) => e.preventDefault());
