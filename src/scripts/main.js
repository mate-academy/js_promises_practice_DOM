'use strict';

const body = document.querySelector('body');

function createNotification(result, messageText) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');

  notification.className = result;
  notification.textContent = messageText;
  body.appendChild(notification);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

promise1
  .then(() => {
    createNotification('success', 'First promise was resolved');
  })
  .catch((message) => {
    createNotification('error', message);
  });

promise2
  .then(() => {
    createNotification('success', 'Second promise was resolved');
  })
  .catch(() => {
    createNotification('error', 'Error');
  });

promise3
  .then(() => {
    createNotification('success', 'Third promise was resolved');
  })
  .catch(() => {
    createNotification('error', 'Third promise was rejected');
  });
