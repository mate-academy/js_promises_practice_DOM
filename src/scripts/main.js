'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      clearTimeout(timeout);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (mouseEvent) => {
    if (mouseEvent.button === 0 || mouseEvent.button === 2) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (mouseEvent) => {
    mouseEvent.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      leftClicked = true;
    }

    if (mouseEvent.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (mouseEvent) => {
    mouseEvent.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = message;
  document.body.appendChild(notification);
}

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

secondPromise.then((message) => showNotification(message, 'success'));

thirdPromise.then((message) => showNotification(message, 'success'));
