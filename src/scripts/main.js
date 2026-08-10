'use strict';

let isRightClick = false;
let isLeftClick = false;
let thirdPromiseResolved = false;
let resolveThirdPromise;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    isLeftClick = true;

    if (isRightClick && !thirdPromiseResolved) {
      resolveThirdPromise('Third promise was resolved');

      thirdPromiseResolved = true;
    }
    resolve('First promise was resolved');
  });
  setTimeout(() => reject(Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    isLeftClick = true;

    if (isRightClick && !thirdPromiseResolved) {
      resolveThirdPromise('Third promise was resolved');

      thirdPromiseResolved = true;
    }
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    isRightClick = true;

    if (isLeftClick && !thirdPromiseResolved) {
      resolveThirdPromise('Third promise was resolved');

      thirdPromiseResolved = true;
    }
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  resolveThirdPromise = resolve;
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);

function successHandler(value) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = 'success';
  notification.textContent = value;
  document.body.prepend(notification);
}

function errorHandler(value) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = 'error';
  notification.textContent = value;
  document.body.prepend(notification);
}
