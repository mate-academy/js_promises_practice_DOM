'use strict';

function sendNotification(message, hasError = false) {
  const handler = document.createElement('div');

  handler.setAttribute('data-qa', 'notification');
  handler.classList.add(hasError ? 'error' : 'success');
  handler.textContent = message;

  document.body.appendChild(handler);
}

const firstPromise = new Promise((resolve, reject) => {
  let isClicked = false;

  document.addEventListener('click', () => {
    isClicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!isClicked) {
      reject(new Error('First promise was rejected'));
    }
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
  const isClicked = [];

  document.addEventListener('click', () => {
    isClicked.push('left');

    if (isClicked.includes('left') && isClicked.includes('right')) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    isClicked.push('right');

    if (isClicked.includes('left') && isClicked.includes('right')) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(sendNotification)
  .catch((error) => sendNotification(error.message, true));

secondPromise
  .then(sendNotification)
  .catch((error) => sendNotification(error.message, true));

thirdPromise
  .then(sendNotification)
  .catch((error) => sendNotification(error.message, true));
