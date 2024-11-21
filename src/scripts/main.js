'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let isClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      isClicked = true;
      resolve('First promise was resolved on a left click in the document');
    }
  });

  setTimeout(() => {
    if (!isClicked) {
      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let isLeft = false;
  let isRight = false;

  document.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.button === 0) {
      isLeft = true;
    }

    if (e.button === 2) {
      isRight = true;
    }

    if (isLeft && isRight) {
      resolve('The third Promise resolved');
    }
  });
});

function showNotification(message, isSuccess) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = isSuccess ? 'success' : 'error';
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then((message) => showNotification(message, true))
  .catch((error) => showNotification(error, false));

secondPromise.then((message) => showNotification(message), true);

thirdPromise.then((message) => showNotification(message), true);
