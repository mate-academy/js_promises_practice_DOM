'use strict';

function createPromises() {
  let leftClick = false;
  let rightClick = false;

  const firstPromise = new Promise((resolve, reject) => {
    const clickHandler = ($event) => {
      if ($event.button === 0) {
        resolve('First promise was resolved');
        document.removeEventListener('click', clickHandler);
        clearTimeout(timeoutId);
      }
    };

    const timeoutId = setTimeout(() => {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', clickHandler);
    }, 3000);

    document.addEventListener('click', clickHandler);
  });

  const secondPromise = new Promise((resolve) => {
    const clickHandler = ($event) => {
      if ($event.button === 0 || $event.button === 2) {
        resolve('Second promise was resolved');
        document.removeEventListener('click', clickHandler);
      }
    };

    document.addEventListener('click', clickHandler);
  });

  const thirdPromise = new Promise((resolve) => {
    const clickHandler = ($event) => {
      if ($event.button === 0) {
        leftClick = true;
      } else if ($event.button === 2) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
        document.removeEventListener('click', clickHandler);
      }
    };

    document.addEventListener('click', clickHandler);
  });

  firstPromise
    .then((message) => createNotification('success', message))
    .catch((error) => createNotification('error', error));

  secondPromise.then((message) => createNotification('success', message));

  thirdPromise.then((message) => createNotification('success', message));
}

function createNotification(className, message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(className);
  notification.textContent = message;
  document.body.appendChild(notification);
}

createPromises();
