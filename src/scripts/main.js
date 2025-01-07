'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

let firstBtn = null;
const promise3 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (
      (firstBtn === 0 && e.button === 2) ||
      (firstBtn === 2 && e.button === 0)
    ) {
      resolve('Third promise was resolved');
    } else {
      firstBtn = e.button;
    }
  });
});

promise1
  .then((result) => {
    addNotification(result);
  })
  .catch((error) => {
    addNotification(error, true);
  });

promise2
  .then((result) => {
    addNotification(result);
  })
  .catch((error) => {
    addNotification(error, true);
  });

promise3
  .then((result) => {
    addNotification(result);
  })
  .catch((error) => {
    addNotification(error, true);
  });

function addNotification(message, isError = false) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isError ? 'error' : 'success';
  notification.innerText = message;

  document.body.append(notification);
}
