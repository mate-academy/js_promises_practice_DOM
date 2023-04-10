'use strict';

const body = document.querySelector('body');
let notificationRightPosition = 50;

function createNotification(text, className) {
  const notification = document.createElement('div');

  notification.style.right = `${notificationRightPosition}px`;
  notification.dataset.qa = 'notification';
  notification.textContent = text;
  notification.className = className;
  body.append(notification);

  notificationRightPosition += 300;

  return notification;
}

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  body.addEventListener('click', () => {
    clicked = true;
    resolve();
  });

  if (!clicked) {
    setTimeout(reject, 3000);
  }
});

firstPromise
  .then(() => {
    createNotification('First promise was resolved', 'success');
  })
  .catch(() => {
    createNotification('First promise was rejected', 'warning');
  });

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('contextmenu', (e) => {
    resolve();
  });

  body.addEventListener('click', () => {
    resolve();
  });
});

secondPromise
  .then(() => {
    createNotification('Second promise was resolved', 'success');
  })
  .catch(() => {
    createNotification('Second promise was rejected', 'warning');
  });

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      rightClick = true;
    }

    if (e.button === 0) {
      leftClick = true;
    }

    if (rightClick && leftClick) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => {
    createNotification('Third promise was resolved', 'success');
  })
  .catch(() => {
    createNotification('Third promise was rejected', 'warning');
  });
