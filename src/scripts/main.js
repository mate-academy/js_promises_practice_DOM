'use strict';

const body = document.querySelector('body');

function showMessage(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(`${type}`);
  div.textContent = message;

  body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const id = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  const firstPromiseHandler = (e) => {
    if (e.button === 0) {
      clearTimeout(id);
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', firstPromiseHandler);
    }
  };

  document.addEventListener('mousedown', firstPromiseHandler);
});

const secondPromise = new Promise((resolve, reject) => {
  let leftCheck = false;
  let rightCheck = false;

  const secondPromiseHandler = (e) => {
    if (e.button === 0) {
      leftCheck = true;
    }

    if (e.button === 2) {
      rightCheck = true;
    }

    if (leftCheck || rightCheck) {
      resolve('Second promise was resolved');

      document.removeEventListener('mousedown', secondPromiseHandler);
    }
  };

  document.addEventListener('mousedown', secondPromiseHandler);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftCheck = false;
  let rightCheck = false;

  const thirdPromiseHandler = (e) => {
    if (e.button === 0) {
      leftCheck = true;
    }

    if (e.button === 2) {
      rightCheck = true;
    }

    if (leftCheck && rightCheck) {
      resolve('Third promise was resolved');

      document.removeEventListener('mousedown', thirdPromiseHandler);
    }
  };

  document.addEventListener('mousedown', thirdPromiseHandler);
});

firstPromise
  .then((message) => {
    showMessage(message, 'success');
  })
  .catch((message) => {
    const errorMessage = message.message;

    showMessage(errorMessage, 'error');
  });

secondPromise.then((message) => {
  showMessage(message, 'success');
});

thirdPromise.then((message) => {
  showMessage(message, 'success');
});
