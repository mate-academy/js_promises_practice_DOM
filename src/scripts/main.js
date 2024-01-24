/* eslint-disable padding-line-between-statements */
/* eslint-disable prefer-promise-reject-errors */
'use strict';

const body = document.querySelector('body');

const notification = document.createElement('div');
notification.setAttribute('data-qa', 'notification');

body.appendChild(notification);

const onSuccess = (message) => {
  notification.textContent = message;
  notification.className = 'success';
};

const onError = (message) => {
  notification.textContent = message;
  notification.className = 'warning';
};

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve(`Second promise was resolved`);
  });
});

const thirdPromise = Promise.all([
  new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve(true);
    });
  }),

  new Promise((resolve, reject) => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      resolve(true);
    });
  }),
]);

firstPromise
  .then(onSuccess)
  .catch(onError);

secondPromise.then(onSuccess);

thirdPromise.then(() => {
  onSuccess(`Third promise was resolved`);
});
