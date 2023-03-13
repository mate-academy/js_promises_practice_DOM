'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftButton;
  let rightButton;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(successHandler)
  .catch(errorHandler);

secondPromise
  .then(successHandler)
  .catch(errorHandler);

thirdPromise
  .then(successHandler)
  .catch(errorHandler);

function successHandler(result) {
  const success = document.createElement('div');

  success.innerHTML = `
  <div data-qa="notification" class="success">
    ${result}
  </div>
  `;

  document.body.append(success);
}

function errorHandler() {
  const error = document.createElement('div');

  error.innerHTML = `
  <div data-qa="notification" class="warning">
    First promise was rejected
  </div>
  `;

  document.body.append(error);
}
