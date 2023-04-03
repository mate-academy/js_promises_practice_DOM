'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(`Second promise was resolved`);
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  });
});

firstPromise
  .then(successHandler)
  .catch(errorHandler);

secondPromise
  .then(successHandler);

thirdPromise
  .then(successHandler);

function successHandler(message) {
  const success = document.createElement('div');

  success.innerHTML = `
    <div data-qa="notification" class="success">
      ${message}
    </div>
  `;

  document.body.append(success);
}

function errorHandler(message) {
  const error = document.createElement('div');

  error.innerHTML = `
    <div data-qa="notification" class="warning">
      ${message}
    </div>
  `;

  document.body.append(error);
}
