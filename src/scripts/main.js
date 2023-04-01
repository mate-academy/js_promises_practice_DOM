'use strict';

function handlePromiseResult(message, isResolved = true) {
  const notificationClass = isResolved
    ? 'success'
    : 'warning';

  document.body.insertAdjacentHTML(
    'beforeend',
    `
      <div data-qa="notification" class="${notificationClass}">
        ${message}
      </div>
    `
  );
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => (
    resolve('First promise was resolved')
  ));

  setTimeout(() => reject(Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', ({ button }) => {
    if (button === 0 || button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isRightMouseButtonPressed = false;
  let isLeftMouseButtonPressed = false;

  document.addEventListener('mousedown', ({ button }) => {
    if (button === 0) {
      if (isRightMouseButtonPressed) {
        resolve('Third promise was resolved');
      } else {
        isLeftMouseButtonPressed = true;
      }
    } else if (button === 2) {
      if (isLeftMouseButtonPressed) {
        resolve('Third promise was resolved');
      } else {
        isRightMouseButtonPressed = true;
      }
    }
  });
});

firstPromise
  .then((result) => handlePromiseResult(result))
  .catch((error) => handlePromiseResult(error.message, false));

secondPromise
  .then((result) => handlePromiseResult(result));

thirdPromise
  .then((result) => handlePromiseResult(result));
