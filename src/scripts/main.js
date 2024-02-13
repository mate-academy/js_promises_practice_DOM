'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = Promise.all([
  new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve();
    });
  }),

  new Promise((resolve) => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  }),
]);

function createSuccessNotification(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList = 'success';
  div.textContent = message;

  body.append(div);
}

function createErrorNotification(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList = 'error';
  div.textContent = message;

  body.append(div);
}

firstPromise
  .then((resolve) => {
    createSuccessNotification(resolve);
  }).catch((reject) => {
    createErrorNotification(reject);
  });

secondPromise
  .then((resolve) => {
    createSuccessNotification(resolve);
  });

thirdPromise
  .then(() => {
    createSuccessNotification('Third promise was resolved');
  });
