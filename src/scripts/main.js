'use strict';

const createNotification = (type, message) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${type}" data-qa="notification">${message}</div>
  `);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 1 || ev.button === 2) {
      resolve(`First promise was resolved`);
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(message => createNotification(`success`, message))
  .catch(error => createNotification(`warning`, error.message));

secondPromise
  .then(message => createNotification(`success`, message));

thirdPromise
  .then(message => createNotification(`success`, message));
