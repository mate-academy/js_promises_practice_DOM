'use strict';

const promise1 = new Promise((resolve, reject) => {
  const timer
    = setTimeout(() => reject(new Error('First promise was rejected')), 3000);

  document.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

const promise2 = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

/* eslint-disable promise/param-names */
const promise3 = new Promise(resolve => {
  Promise.all([
    new Promise(resolveFirst =>
      document.addEventListener('click', resolveFirst)),
    new Promise(resolveSecond =>
      document.addEventListener('contextmenu', resolveSecond)),
  ])
    .then(() => resolve('Third promise was resolved'));
});

promise1
  .then(successHandler)
  .catch(error => errorHandler(error.message));

promise2
  .then(successHandler);

promise3
  .then(successHandler);

function successHandler(message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add('success');
  notification.innerText = message;
  document.body.append(notification);
}

function errorHandler(errorMessage) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add('warning');
  notification.innerText = errorMessage;
  document.body.append(notification);
}
