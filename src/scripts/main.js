'use strict';

const logo = document.querySelector('.logo');
const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });
});

const successHandler = (message) => {
  const messageBlock = document.createElement('div');

  messageBlock.classList.add('notification', 'notification__success');
  messageBlock.dataset.qa = 'notification';
  messageBlock.textContent = message;
  body.append(messageBlock);
};

const errorHandler = (message) => {
  const messageBlock = document.createElement('div');

  messageBlock.classList.add('notification', 'notification__warning');
  messageBlock.dataset.qa = 'notification';
  messageBlock.textContent = message;
  body.append(messageBlock);
};

firstPromise
  .then(successHandler)
  .catch(errorHandler);

secondPromise
  .then(successHandler);

thirdPromise
  .then(successHandler);
