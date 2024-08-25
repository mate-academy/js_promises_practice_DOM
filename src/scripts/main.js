'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  document.addEventListener('click', () => {
    left = true;

    if (right) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    right = true;

    if (left) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(successHandler, errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);

function successHandler(result) {
  showMessage('success', result);
}

function errorHandler(result) {
  showMessage('error', result);
}

function showMessage(type, message) {
  const notification = document.createElement('div');

  notification.innerHTML = message;
  notification.classList.add(type);
  notification.dataset.qa = 'notification';
  document.body.appendChild(notification);
}
