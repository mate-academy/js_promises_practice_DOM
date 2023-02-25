'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  const text = 'Second promise was resolved';

  document.addEventListener('click', () => {
    resolve(text);
  });

  document.addEventListener('contextmenu', () => {
    resolve(text);
  });
});

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  Promise.all([leftClick, rightClick])
    .then(() => resolve('Third promise was resolved'));
});

const successHandler = (success) => {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="success">${success}</>`
  );
};

const errorHandler = (error) => {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="warning">${error}</>`
  );
};

firstPromise
  .then(successHandler)
  .catch(errorHandler);

secondPromise
  .then(successHandler)
  .catch(errorHandler);

thirdPromise
  .then(successHandler)
  .catch(errorHandler);
