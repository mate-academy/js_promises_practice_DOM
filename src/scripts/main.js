'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeOut = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timeOut);
      resolve('First promise was resolved on a left click in the document');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');

      leftClick = false;
      rightClick = false;
    }
  });

  document.addEventListener('contextmenu', (e) => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');

      leftClick = false;
      rightClick = false;
    }
  });
});

const showshowNotification = (message, isError = false) => {
  const notification = document.createElement('div');

  notification.classList.add('notification');
  notification.classList.add(isError ? 'error' : 'success');
  notification.textContent = message;
  notification.setAttribute('data-qa', 'notification');
  document.body.appendChild(notification);
};

firstPromise
  .then((message) => showshowNotification(message))
  .catch((error) => showshowNotification(error.message, true));
secondPromise.then((message) => showshowNotification(message));
thirdPromise.then((message) => showshowNotification(message));
