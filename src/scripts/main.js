'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  const createNotification = (message, isError = false) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = isError ? 'error' : 'success';
    div.textContent = message;
    document.body.appendChild(div);
  };

  const firstPromise = new Promise((resolve, reject) => {
    const clickHandler = (ev) => {
      if (ev.button === 0) {
        resolve('First promise was resolved on a left click in the document');
        document.removeEventListener('click', clickHandler);
      }
    };

    document.addEventListener('click', clickHandler);

    setTimeout(() => {
      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
      document.removeEventListener('click', clickHandler);
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    document.addEventListener('click', (ev) => {
      if (ev.button === 0 || ev.button === 2) {
        resolve('Second promise was resolved');
      }
    });
  });

  const thirdPromise = new Promise((resolve) => {
    document.addEventListener('click', (ev) => {
      if (ev.button === 0) {
        leftClickHappened = true;
      }

      if (ev.button === 2) {
        rightClickHappened = true;
      }

      if (leftClickHappened && rightClickHappened) {
        resolve('Third promise was resolved after both left and right clicks');
        leftClickHappened = false;
        rightClickHappened = false;
      }
    });
  });

  firstPromise
    .then((message) => createNotification(message))
    .catch((error) => createNotification(error.message, true));
  secondPromise.then((message) => createNotification(message));
  thirdPromise.then((message) => createNotification(message));
});
