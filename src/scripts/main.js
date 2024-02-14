'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  function onClick() {
    return resolve('Second promise was resolved');
  };

  document.addEventListener('click', () => onClick());
  document.addEventListener('contextmenu', () => onClick());
});

const promiseLeftClick = new Promise(resolve => {
  document.addEventListener('click', () => {
    return resolve();
  });
});

const promiseRightClick = new Promise(resolve => {
  document.addEventListener('contextmenu', () => {
    return resolve();
  });
});

const promise3 = new Promise((resolve) => {
  resolve('Third promise was resolved');
});

const successHandler = (message) => {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="success" data-qa="notification">${message}</div>`,
  );
};

const errorHandler = (error) => {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="error" data-qa="notification">${error.message}</div>`,
  );
};

promise1
  .then((message) => {
    successHandler(message);
  })
  .catch((error) => {
    errorHandler(error);
  });

promise2
  .then((message) => {
    successHandler(message);
  })
  .catch((error) => {
    errorHandler(error);
  });

Promise.all([promiseLeftClick, promiseRightClick])
  .then((result) => promise3)
  .then((message) => {
    successHandler(message);
  })
  .catch((error) => {
    errorHandler(error);
  });
