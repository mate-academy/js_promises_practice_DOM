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
  body.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
})
  .then((value) => makeNotification(value))
  .catch((value) => makeNotification(value, 'warning'));

new Promise(resolve => {
  body.addEventListener('mousedown', (ev) => {
    if (ev.button === 2 || ev.button === 0) {
      resolve('Second promise was resolved');
    }
  });
})
  .then((value) => makeNotification(value));

new Promise(resolve => {
  body.addEventListener('click', () => {
    body.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      resolve('Third promise was resolved');
    });
  });
})
  .then((value) => makeNotification(value));
