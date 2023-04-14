'use strict';

const leftClick = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClick = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const firstPromise = new Promise((resolve, reject) => {
  leftClick
    .then(() => {
      resolve('First promise was resolved');
    });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  leftClick
    .then(() => {
      resolve('Second promise was resolved');
    });

  rightClick
    .then(() => {
      resolve('Second promise was resolved');
    });
});

const thirdPromise = new Promise((resolve, reject) => {
  leftClick
    .then(() => rightClick)
    .then(() => {
      resolve('Third promise was resolved');
    });
});

const success = (message) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="success" data-qa="notification">${message}</div>
  `);
};

const error = (err) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="warning" data-qa="notification">${err}</div>
  `);
};

firstPromise
  .then(success, error);

secondPromise
  .then(success, error);

thirdPromise
  .then(success, error);
