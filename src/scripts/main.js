'use strict';

const root = document.querySelector('.root');

const promiseMessageSuccess = (message) => {
  root.insertAdjacentHTML('beforeend', `
    <div class="success" data-qa="notification">
      ${message}
    <div/>
  `);
};

const promiseMessageError = (message) => {
  root.insertAdjacentHTML('beforeend', `
    <div class="warning" data-qa="notification">
      ${message}
    <div/>
  `);
};

const firstPromise = (successMessage, errorMessage) => {
  return new Promise((resolve, reject) => {
    document.onclick = () => {
      resolve(successMessage);
    };

    setTimeout(() => {
      reject(errorMessage);
    }, 3000);
  });
};

const promise = firstPromise(
  'First promise was resolved',
  'First promise was rejected'
);

promise.then(promiseMessageSuccess, promiseMessageError);

const secondPromise = (successMessage) => {
  return new Promise((resolve) => {
    document.addEventListener('click', e => {
      resolve(successMessage);
    });

    document.addEventListener('contextmenu', e => {
      e.preventDefault();
      resolve(successMessage);
    });
  });
};

const promiseClickOnce = secondPromise('Second promise was resolved');

promiseClickOnce.then(promiseMessageSuccess);

let leftClick = false;
let rightClick = false;

const thirdPromise = (successMessage) => {
  return new Promise((resolve) => {
    document.addEventListener('click', e => {
      leftClick = true;

      if (leftClick && rightClick) {
        resolve(successMessage);
      }
    });

    document.addEventListener('contextmenu', e => {
      e.preventDefault();
      rightClick = true;

      if (leftClick && rightClick) {
        resolve(successMessage);
      }
    });
  });
};

const promiseDoubleClick = thirdPromise('Third promise was resolved');

promiseDoubleClick.then(promiseMessageSuccess);
