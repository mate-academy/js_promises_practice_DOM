/* eslint-disable no-console */
'use strict';

const clickPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const contextMenuPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const firstPromise = new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => reject(new Error('First promise was rejected')), 3000);
  });

  const secondPromise = new Promise((resolve) => {
    Promise.race([clickPromise, contextMenuPromise]).then(() => {
      resolve('Second promise was resolved');
    });
  });

  const thirdPromise = new Promise((resolve) => {
    Promise.all([clickPromise, contextMenuPromise]).then(() => {
      resolve('Third promise was resolved');
    });
  });

  const addNotification = (type, data) => {
    const notification = `<div data-qa="notification" class="${type}">${data}</div>`;

    document.body.insertAdjacentHTML('afterbegin', notification);
  };

  firstPromise
    .then((data) => addNotification('success', data))
    .catch((error) => addNotification('error', error));

  secondPromise
    .then((data) => addNotification('success', data))
    .catch((error) => addNotification('error', error));

  thirdPromise
    .then((data) => addNotification('success', data))
    .catch((error) => addNotification('error', error));
});
