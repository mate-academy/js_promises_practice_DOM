'use strict';

const body = document.querySelector('body');

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    leftClick = true;
    resolve('First promise was resolved');
  });

  if (!leftClick) {
    setTimeout(() => {
      reject(error);
    }, 3000);
  }
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    rightClick = true;
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    };
  });
});

const success = (message) => {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">${message}</div>
  `);
};

const error = () => {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">First promise was rejected</div>
  `);
};

firstPromise
  .then(success)
  .catch(error);

secondPromise
  .then(success);

thirdPromise
  .then(success);
