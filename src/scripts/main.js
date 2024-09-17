'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let leftClickOccurred = false;
  let rightClickOccurred = false;

  // Success and error notification function
  function showNotification(message, isError = false) {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.className = isError ? 'error' : 'success';
    notification.textContent = message;
    document.body.appendChild(notification);
  }

  // First promise
  const firstPromise = new Promise((resolve, reject) => {
    const handleLeftClick = () => {
      resolve('First promise was resolved');
      document.removeEventListener('click', handleLeftClick);
    };

    document.addEventListener('click', handleLeftClick);

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', handleLeftClick);
    }, 3000);
  });

  firstPromise
    .then((message) => showNotification(message))
    .catch((message) => showNotification(message, true));

  // Second promise
  const secondPromise = new Promise((resolve) => {
    const handleClick = (events) => {
      if (events.button === 0 || events.button === 2) {
        resolve('Second promise was resolved');
        document.removeEventListener('click', handleClick);
        document.removeEventListener('contextmenu', handleClick);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleClick);
  });

  secondPromise.then((message) => showNotification(message));

  // Third promise
  const thirdPromise = new Promise((resolve) => {
    const handleBothClicks = (events) => {
      if (events.button === 0) {
        leftClickOccurred = true;
      }

      if (events.button === 2) {
        rightClickOccurred = true;
      }

      if (leftClickOccurred && rightClickOccurred) {
        resolve('Third promise was resolved');
        document.removeEventListener('click', handleBothClicks);
        document.removeEventListener('contextmenu', handleBothClicks);
      }
    };

    document.addEventListener('click', handleBothClicks);
    document.addEventListener('contextmenu', handleBothClicks);
  });

  thirdPromise.then((message) => showNotification(message));
});
