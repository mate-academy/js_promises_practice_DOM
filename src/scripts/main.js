'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let LPMclicked = false;
  let RPMclicked = false;

  document.addEventListener('click', () => {
    LPMclicked = true;

    if (LPMclicked && RPMclicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    RPMclicked = true;

    if (LPMclicked && RPMclicked) {
      resolve('Third promise was resolved');
    }
  });
});

function showNotification(message, notificationType) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(notificationType);
  notification.textContent = message;
  document.body.append(notification);
}

firstPromise.then(
  (message) => showNotification(message, 'success'),
  (error) => showNotification(error.message, 'error'),
);

secondPromise.then(
  (message) => showNotification(message, 'success'),
  (error) => showNotification(error.message, 'error'),
);

thirdPromise.then(
  (message) => showNotification(message, 'success'),
  (error) => showNotification(error.message, 'error'),
);
