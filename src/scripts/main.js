'use strict';

const body = document.querySelector('body');

const makeNotification = (text, notificationClass = 'success') => {
  const notification = document.createElement('div');

  notification.className = notificationClass;
  notification.innerText = text;
  notification.setAttribute('data-qa', 'notification');

  return body.append(notification);
};

new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was resolved'));
  }, 3000);
})
  .then((value) => makeNotification(value))
  .catch((value) => makeNotification(value, 'warning'));

new Promise(resolve => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  });
})
  .then((value) => makeNotification(value));

new Promise(resolve => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mouseup', (ev) => {
    if (ev.button === 0) {
      leftButton = false;
    }

    if (ev.button === 2) {
      rightButton = false;
    }
  });

  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      leftButton = true;
    }

    if (ev.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
})
  .then((value) => makeNotification(value));
