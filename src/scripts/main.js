'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  document.addEventListener('click', () => {
    if (isRightClicked) {
      resolve('Third promise was resolved');
    } else {
      isLeftClicked = true;
    }
  });

  document.addEventListener('contextmenu', () => {
    if (isLeftClicked) {
      resolve('Third promise was resolved');
    } else {
      isRightClicked = true;
    }
  });
});

firstPromise
  .then((message) => showNotification('success', message))
  .catch((message) => showNotification('error', message));

secondPromise.then((message) => showNotification('success', message));
thirdPromise.then((message) => showNotification('success', message));

function showNotification(type, message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = type;
  notification.textContent = message;

  document.body.append(notification);
}
