'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const firstPromise = new Promise((resolve, reject) => {
    let clickDetected = false;

    const handleClick = (e) => {
      if (e.button === 0) {
        clickDetected = true;
        resolve('First promise was resolved');
      }
    };

    document.addEventListener('click', handleClick);

    setTimeout(() => {
      if (!clickDetected) {
        reject(new Error('First promise was rejected'));
      }
      document.removeEventListener('click', handleClick);
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    const handleClick = (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    };

    document.addEventListener('click', handleClick);
  });

  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    const handleClick = (e) => {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    };

    document.addEventListener('click', handleClick);
  });

  const showNotification = (message, type) => {
    const notification = document.createElement('div');

    notification.classList.add('notification', type);
    notification.setAttribute('data-qa', 'notification');
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  firstPromise
    .then((message) => showNotification(message, 'success'))
    .catch((message) => showNotification(message, 'error'));

  secondPromise.then((message) => showNotification(message, 'success'));

  thirdPromise.then((message) => showNotification(message, 'success'));
});
