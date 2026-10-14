'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function createNotification(type, message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';

  if (type === 'success') {
    notification.classList.add('success');
    notification.textContent = message;
  } else {
    notification.classList.add('error');
    notification.textContent = message;
  }

  document.body.append(notification);
}

firstPromise
  .then((message) => createNotification('success', message))
  .catch((error) => createNotification('error', error.message));

secondPromise
  .then((message) => createNotification('success', message))
  .catch((error) => createNotification('error', error.message));

thirdPromise
  .then((message) => createNotification('success', message))
  .catch((error) => createNotification('error', error.message));
