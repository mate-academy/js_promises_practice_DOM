'use strict';

const body = document.querySelector('body');

function notification(className, message) {
  body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${className}">${message}</div>
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
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
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
  .then((message) => {
    notification('success', message);
  })
  .catch((message) => {
    notification('warning', message);
  });

secondPromise.then();

thirdPromise.then((message) => {
  notification('success', message);
});
