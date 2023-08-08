'use strict';
/* eslint-disable prefer-promise-reject-errors */

const body = document.body;

const appendNotification = (message, isError = false) => {
  const notification = document.createElement('div');

  notification.className = isError
    ? 'warning'
    : 'success';

  notification.setAttribute('data-qa', 'notification');

  notification.textContent = message;
  body.appendChild(notification);
};

const handlePromise = (promise) => {
  promise
    .then((message) => appendNotification(message))
    .catch((message) => appendNotification(message, true));
};

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  const resolvePromise = () => resolve('Second promise was resolved');

  document.addEventListener('click', resolvePromise);

  document.addEventListener('contextmenu', resolvePromise);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const resolvePromise = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;
    resolvePromise();
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    resolvePromise();
  });
});

handlePromise(firstPromise);
handlePromise(secondPromise);
handlePromise(thirdPromise);
