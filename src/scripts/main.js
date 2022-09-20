/* eslint-disable no-shadow */
'use strict';

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

const thirdPromise = new Promise((resolve) => {
  let right = false;
  let left = false;

  document.addEventListener('mousedown', event => {
    document.addEventListener('click', () => {
      left = event.button === 0 || left;
    });

    document.addEventListener('contextmenu', () => {
      right = event.button === 2 || right;
    });

    if (event.button !== 0 && event.button !== 2) {
      return;
    }

    left = event.button === 0 || left;
    right = event.button === 2 || right;

    if (!left || !right) {
      return;
    }

    resolve('Third promise was resolved');
  });
});

const handleNotification = (message, status) => {
  const element = document.createElement('div');

  element.innerHTML = `
  <div data-qa="notification" class="message ${status}">
    ${message}
  </div>
  `;
  document.querySelector('.message-container').append(element);
};

const handleSuccess = (message) => handleNotification(message, 'success');

const handleError = (message) => handleNotification(message, 'warning');

firstPromise
  .then(result => {
    handleSuccess(result);
  })
  .catch(error => {
    handleError(error);
  });

secondPromise
  .then(result => {
    handleSuccess(result);
  });

thirdPromise
  .then(result => {
    handleSuccess(result);
  })
  .catch(error => {
    handleError(error);
  });
