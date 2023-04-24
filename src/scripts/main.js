'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeout);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function createNotification(type, message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  document.body.appendChild(notification);
  notification.classList.add(`${type}`);
  notification.innerHTML = message;
}

firstPromise
  .then(success => {
    createNotification('success', success);
  })
  .catch(error => {
    createNotification('warning', error);
  });

secondPromise
  .then(success => {
    createNotification('success', success);
  });

thirdPromise
  .then(success => {
    createNotification('success', success);
  });
