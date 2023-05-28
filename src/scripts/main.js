'use strict';

const body = document.querySelector('body');

const successHandler = (message) => {
  body.insertAdjacentHTML('beforebegin', `
  <div data-qa="notification" class="success">${message}</div>
  `);
};

const errorHandler = (message) => {
  body.insertAdjacentHTML('beforebegin', `
  <div data-qa="notification" class="warning">${message}</div>
  `);
};

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  body.addEventListener('click', (e) => {
    if (e.button === 0) {
      clicked = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });
});

const rightClick = new Promise((resolve) => {
  body.addEventListener('click', (e) => {
    resolve();
  });
});

const leftClick = new Promise((resolve) => {
  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  Promise.all([rightClick, leftClick])
    .then(() => resolve('Third promise was resolved'));
});

firstPromise
  .then(successHandler)
  .catch(errorHandler);

secondPromise.then(successHandler);

thirdPromise.then(successHandler);
