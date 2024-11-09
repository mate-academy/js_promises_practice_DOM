/* eslint-disable no-shadow */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let leftClicked = false;
  let rightClicked = false;

  const firstPromise = new Promise((resolve, reject) => {
    const handleLeftClick = (event) => {
      if (event.button === 0) {
        resolve('First promise was resolved');
        document.removeEventListener('mousedown', handleLeftClick);
      }
    };

    document.addEventListener('mousedown', handleLeftClick);

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('mousedown', handleLeftClick);
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    const handleClick = (event) => {
      if (event.button === 0 || event.button === 2) {
        resolve('Second promise was resolved');
        document.removeEventListener('mousedown', handleClick);
      }
    };

    document.addEventListener('mousedown', handleClick);
  });

  const thirdPromise = new Promise((resolve) => {
    const checkBothClicks = () => {
      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        document.removeEventListener('mousedown', handleClick);
      }
    };

    const handleClick = (event) => {
      if (event.button === 0) {
        leftClicked = true;
      }

      if (event.button === 2) {
        rightClicked = true;
      }
      checkBothClicks();
    };

    document.addEventListener('mousedown', handleClick);
  });

  const handleSuccess = (message) => {
    const notification = document.createElement('div');

    notification.className = 'success';
    notification.setAttribute('data-qa', 'notification');
    notification.textContent = message;
    document.body.appendChild(notification);
  };

  const handleError = (message) => {
    const notification = document.createElement('div');

    notification.className = 'error';
    notification.setAttribute('data-qa', 'notification');
    notification.textContent = message;
    document.body.appendChild(notification);
  };

  firstPromise.then(handleSuccess).catch(handleError);
  secondPromise.then(handleSuccess);
  thirdPromise.then(handleSuccess);
});
