'use strict';

function notificationMessage(text, isError = false) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(isError ? 'success' : 'error');
  notification.textContent = text;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timeout);

      return resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      return resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      return resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => notificationMessage(message))
  .catch((error) => notificationMessage(error.message, true));

secondPromise.then((message) => notificationMessage(message));

thirdPromise.then((message) => notificationMessage(message));
