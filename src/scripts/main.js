/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
'use strict';

document.addEventListener('contextmenu', (e) => e.preventDefault());

const body = document.querySelector('body');

function appendNotification(text, extraClass) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(extraClass);
  notification.textContent = text;
  body.append(notification);
}

const handleSuccess = (msg) => {
  appendNotification(msg, 'success');
};

const handleError = (msg) => {
  appendNotification(msg, 'error');
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject('First promise was rejected'), 3000);
})
  .then(handleSuccess)
  .catch(handleError);

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if ([0, 2].includes(e.button)) {
      resolve('Second promise was resolved');
    }
  });
})
  .then(handleSuccess)
  .catch(handleError);

const thirdPromise = new Promise((resolve) => {
  let count = 0;

  const tryResolve = () => {
    if (count === 2) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener(
    'click',
    () => {
      count += 1;
      tryResolve();
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      count += 1;
      tryResolve();
    },
    { once: true },
  );
})
  .then(handleSuccess)
  .catch(handleError);
