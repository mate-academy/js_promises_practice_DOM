'use strict';

const firstPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);

    document.addEventListener('click', () => {
      resolve('First promise was resolved');
    });
  });
};

const secondPromise = () => {
  return new Promise((resolve, reject) => {
    ['click', 'contextmenu'].forEach((type) => {
      document.addEventListener(type, () => {
        resolve('Second promise was resolved');
      });
    });
  });
};

const thirdPromise = () => {
  return new Promise((resolve, reject) => {
    let rightClick = 0;

    let contextmenu = 0;

    document.addEventListener('click', () => {
      if (contextmenu) {
        resolve('Third promise was resolved');
      }

      rightClick++;
    });

    document.addEventListener('contextmenu', () => {
      if (rightClick) {
        resolve('Third promise was resolved');
      }

      contextmenu++;
    });
  });
};

function response(message, type) {
  document.body.innerHTML += `<div data-qa="notification" class="${type}">${message}<div>`;
}

firstPromise()
  .then((message) => response(message, 'success'))
  .catch((errorMessage) => {
    response(errorMessage.message, 'failure');
  });

secondPromise()
  .then((message) => response(message, 'success'))
  .catch((errorMessage) => {
    response(errorMessage.message, 'failure');
  });

thirdPromise()
  .then((message) => response(message, 'success'))
  .catch((errorMessage) => {
    response(errorMessage.message, 'failure');
  });
