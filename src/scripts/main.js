'use strict';

const bodyElement = document.body;

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

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = null;
  let leftClick = null;

  document.addEventListener('click', () => {
    leftClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

function addNotification(promise) {
  promise
    .then((message) => {
      const notification = document.createElement('div');

      notification.dataset.qa = 'notification';
      notification.className = 'success';
      notification.textContent = message;
      bodyElement.append(notification);
    })
    .catch((error) => {
      const notification = document.createElement('div');

      notification.dataset.qa = 'notification';
      notification.className = 'error';
      notification.textContent = error.message;
      bodyElement.append(notification);
    });
}

addNotification(firstPromise);
addNotification(secondPromise);
addNotification(thirdPromise);
