/* eslint-disable function-paren-newline */
/* eslint-disable prefer-promise-reject-errors */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
});

firstPromise
  .then((message) => {
    const successMessage = document.createElement('div');

    successMessage.classList.add('success');
    successMessage.dataset.qa = 'notification';
    successMessage.textContent = message;

    document.body.appendChild(successMessage);
  })
  .catch((err) => {
    const errorMessage = document.createElement('div');

    errorMessage.classList.add('error');
    errorMessage.dataset.qa = 'notification';
    errorMessage.textContent = err;

    document.body.appendChild(errorMessage);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () =>
    resolve('Second promise was resolved'),
  );

  document.addEventListener('contextmenu', () =>
    resolve('Second promise was resolved'),
  );
});

secondPromise
  .then((message) => {
    const successMessage = document.createElement('div');

    successMessage.classList.add('success');
    successMessage.dataset.qa = 'notification';
    successMessage.textContent = message;

    document.body.appendChild(successMessage);
  })
  .catch((err) => {
    const errorMessage = document.createElement('div');

    errorMessage.classList.add('error');
    errorMessage.dataset.qa = 'notification';
    errorMessage.textContent = err;

    document.body.appendChild(errorMessage);
  });

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });
});

thirdPromise
  .then((message) => {
    const successMessage = document.createElement('div');

    successMessage.classList.add('success');
    successMessage.dataset.qa = 'notification';
    successMessage.textContent = message;

    document.body.appendChild(successMessage);
  })
  .catch((err) => {
    const errorMessage = document.createElement('div');

    errorMessage.classList.add('error');
    errorMessage.dataset.qa = 'notification';
    errorMessage.textContent = err;

    document.body.appendChild(errorMessage);
  });
