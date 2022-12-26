'use strict';

function pushNotification(notificationText, notificationClass) {
  const notification = document.createElement('div');

  notification.className = notificationClass;
  notification.textContent = notificationText;
  notification.setAttribute('data-qa', 'notification');

  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 1) {
      return;
    }
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('contextmenu', (e) => {
    if (e.button === 1) {
      return;
    }

    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick;
  let rightClick;

  document.body.addEventListener('mousedown', (e) => {
    if (e.button !== 0) {
      leftClick = true;
    }

    if (e.button !== 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => {
    pushNotification(result, 'success');
  })
  .catch(error => {
    pushNotification(error, 'warning');
  });

secondPromise.then(result => pushNotification(result, 'success'));

thirdPromise.then(result => pushNotification(result, 'success'));
