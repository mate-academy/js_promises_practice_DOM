'use strict';

function showNotification(message, isSuccess) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');

  notification.className = isSuccess
    ? 'notification success'
    : 'notification error';
  notification.textContent = message;

  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clicked = true;
      resolve('First promise was resolved on a left click in the document');
    }
  });

  setTimeout(() => {
    if (!clicked) {
      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  function clickHandle() {
    if (leftClick && rightClick) {
      resolve(
        `Third promise was resolved only after both left and right clicks happened`,
      );
    }
  }

  document.addEventListener('click', (e) => {
    leftClick = true;
    clickHandle();
  });

  document.addEventListener('contextmenu', (e) => {
    rightClick = true;
    clickHandle();
  });
});

thirdPromise
  .then((message) => showNotification(message, true))
  .catch((error) => showNotification(error, false));

secondPromise
  .then((message) => showNotification(message, true))
  .catch((error) => showNotification(error, false));

firstPromise
  .then((message) => showNotification(message, true))
  .catch((error) => showNotification(error, false));
