'use strict';

function notifyAboutSuccess(message) {
  const handler = document.createElement('div');

  handler.setAttribute('data-qa', 'notification');
  handler.classList.add('success');
  handler.textContent = message;

  document.body.appendChild(handler);
}

function notifyAboutError(message) {
  const handler = document.createElement('div');

  handler.setAttribute('data-qa', 'notification');
  handler.classList.add('error');
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
  .then(notifyAboutSuccess)
  .catch((error) => notifyAboutError(error.message));

secondPromise
  .then(notifyAboutSuccess)
  .catch((error) => notifyAboutError(error.message));

thirdPromise
  .then(notifyAboutSuccess)
  .catch((error) => notifyAboutError(error.message));
