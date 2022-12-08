'use strict';

function createMessage(className, text) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${className}" data-qa="notification">${text}</div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

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
  .then(successMessage => createMessage('success', successMessage))
  .catch(errorMessage => createMessage('error', errorMessage));

secondPromise
  .then(successMessage => createMessage('success', successMessage));

thirdPromise
  .then(successMessage => createMessage('success', successMessage));
