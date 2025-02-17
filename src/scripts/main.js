'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let leftClickOccurred = false;
  let rightClickOccurred = false;

  const firstPromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('First promise was rejected')),
      3000,
    );

    document.addEventListener(
      'click',
      (e) => {
        if (e.button === 0) {
          // Left click
          clearTimeout(timeout);
          resolve('First promise was resolved');
        }
      },
      { once: true },
    );
  });

  const secondPromise = new Promise((resolve) => {
    document.addEventListener(
      'click',
      (e) => {
        if (e.button === 0 || e.button === 2) {
          // Left or right click
          resolve('Second promise was resolved');
        }
      },
      { once: true },
    );
  });

  const thirdPromise = new Promise((resolve) => {
    document.addEventListener('click', (e) => {
      if (e.button === 0) {
        leftClickOccurred = true;
      } else if (e.button === 2) {
        rightClickOccurred = true;
      }

      if (leftClickOccurred && rightClickOccurred) {
        resolve('Third promise was resolved');
      }
    });
  });

  const showNotification = (message, isSuccess) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.classList.add(isSuccess ? 'success' : 'error');
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  firstPromise
    .then((message) => showNotification(message, true))
    .catch((error) => showNotification(error.message, false));

  secondPromise
    .then((message) => showNotification(message, true))
    .catch((error) => showNotification(error.message, false));

  thirdPromise
    .then((message) => showNotification(message, true))
    .catch((error) => showNotification(error.message, false));

  // Prevent the context menu on right click to allow right-click detection
  document.addEventListener('contextmenu', (e) => e.preventDefault());
});
