'use strict';

const bodyElement = document.querySelector('body');

function successHandler(message) {
  const successElement = document.createElement('div');

  successElement.classList.add('success');
  successElement.dataset.qa = 'notification';

  successElement.textContent = message;

  bodyElement.prepend(successElement);
}

function errorHandler({ message }) {
  const errorElement = document.createElement('div');

  errorElement.classList.add('error');
  errorElement.dataset.qa = 'notification';

  errorElement.textContent = message;

  bodyElement.prepend(errorElement);
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });

  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });
});

firstPromise.then((el) => successHandler(el)).catch((el) => errorHandler(el));
secondPromise.then((el) => successHandler(el));
thirdPromise.then((el) => successHandler(el));
