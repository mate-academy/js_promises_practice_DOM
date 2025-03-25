'use strict';

function showMessage(message, className) {
  document.body.insertAdjacentHTML(
    'beforebegin',
    `
    <div data-qa="notification" class="${className}">${message}</div>`,
  );
}

const firstPromise = new Promise((resolve, reject) => {
  // resolve
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  // rejectet
  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

firstPromise
  .then((message) => showMessage(message, 'success'))
  .catch((message) => showMessage(message, 'error'));

const secondPromise = new Promise((resolve, reject) => {
  // resolve
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then((message) => showMessage(message, 'success'))
  .catch((message) => showMessage(message, 'error'));

const thirdPromise = new Promise((resolve, reject) => {
  let leftButtonUp = false;
  let rightButtonUp = false;

  // resolve
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftButtonUp = true;
    } else if (e.button === 2) {
      rightButtonUp = true;
    }

    if (leftButtonUp && rightButtonUp) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((message) => showMessage(message, 'success'))
  .catch((message) => showMessage(message, 'error'));
