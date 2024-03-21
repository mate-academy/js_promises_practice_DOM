'use strict';

const body = document.querySelector('body');

body.style.columnGap = '15px';

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  setInterval(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = 0;
  let rightClick = 0;

  body.addEventListener('click', () => {
    leftClick++;

    printThirdPromiseResolve(leftClick, rightClick, resolve);
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightClick++;
    printThirdPromiseResolve(leftClick, rightClick, resolve);
  });
});

function printThirdPromiseResolve(leftClick, rightClick, resolve) {
  if (leftClick > 0 && rightClick > 0) {
    return resolve();
  }
}

firstPromise
  .then(() => {
    createNotification(
      'success',
      'First promise was resolved',
    );
  })
  .catch(() => {
    createNotification(
      'warning',
      'First promise was rejected',
    );
  });

secondPromise
  .then(() => {
    createNotification(
      'success',
      'Second promise was resolved',
    );
  });

thirdPromise
  .then(() => {
    createNotification(
      'success',
      'Third promise was resolved',
    );
  });

function createNotification(additionalClass, message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = additionalClass;
  notification.style.color = (additionalClass === 'success') ? 'green' : 'red';
  notification.textContent = message;

  body.append(notification);
}
