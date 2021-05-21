'use strict';

const body = document.querySelector('body');
const printMessage = (message, type) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = `${type}`;
  notification.textContent = `${message}`;

  body.append(notification);
};

const timeoutPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    resolve('First promise was resolved', 'success');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected', 'warning');
  }, 3000);
});

timeoutPromise.then((result) => printMessage(result))
  .catch(error => printMessage(error));

const customMouseButtonPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved', 'success');
    }
  });
});

customMouseButtonPromise.then(result => printMessage(result));

const bothButtonsPromise = new Promise((resolve) => {
  const flag = {
    leftClick: false, rightClick: false,
  };

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      flag.leftClick = true;
    }

    if (e.button === 2) {
      flag.rightClick = true;
    }

    if (flag.leftClick && flag.rightClick) {
      resolve('Third promise was resolved', 'success');
    }
  });
});

bothButtonsPromise.then(result => printMessage(result));
