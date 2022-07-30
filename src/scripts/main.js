'use strict';

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve, reject) => {
  const resolveListener = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', resolveListener);
  document.addEventListener('contextmenu', resolveListener);
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftMouseButtonClicked = false;
  let isRightMouseButtonClicked = false;

  document.addEventListener('click', () => {
    if (isRightMouseButtonClicked) {
      resolve('Third promise was resolved');
    }

    isLeftMouseButtonClicked = true;
  });

  document.addEventListener('contextmenu', () => {
    if (isLeftMouseButtonClicked) {
      resolve('Third promise was resolved');
    }

    isRightMouseButtonClicked = true;
  });
});

function showNotification(result, isError) {
  const body = document.querySelector('body');

  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(isError ? 'warning' : 'success');
  notification.textContent = result;

  body.append(notification);
}

firstPromise
  .then((resolved) => showNotification(resolved))
  .catch((rejected) => showNotification(rejected, true));

secondPromise
  .then((resolved) => showNotification(resolved))
  .catch((rejected) => showNotification(rejected, true));

thirdPromise
  .then((resolved) => showNotification(resolved))
  .catch((rejected) => showNotification(rejected, true));
