'use strict';

const resultHandler = (type, result) => {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = result;

  document.body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected').message);
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(resolve => {
  const clicks = new Set();
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      clicks.add(e.button);
    }

    if (clicks.size === 2) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

firstPromise.then((result) => resultHandler('success', result),
  (error) => resultHandler('error', error));
secondPromise.then((result) => resultHandler('success', result));
thirdPromise.then((result) => resultHandler('success', result));
