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

  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0) {
        clearTimeout(id);
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve, reject) => {
  let leftCheck = false;
  let rightCheck = false;

  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0) {
        leftCheck = true;
      }

      if (e.button === 2) {
        rightCheck = true;
      }

      if (leftCheck || rightCheck) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftCheck = false;
  let rightCheck = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftCheck = true;
    }

    if (e.button === 2) {
      rightCheck = true;
    }

    if (leftCheck && rightCheck) {
      resolve('Third promise was resolved');
    }
  });
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
