'use strict';

// First Promise

let firstClicked = false;
const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      firstClicked = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    if (!firstClicked) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', onClick);
    }
  }, 3000);
});

// Second Promise
const secondPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onClick);
    }
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onClick);
});

// Third Promise
let leftClicked = false;
let rightClicked = false;
const thirdPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onClick);
    }
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onClick);
});

// Success handler
function handleSuccess(message) {
  const newElement = document.createElement('div');

  newElement.classList.add('notification', 'success');
  newElement.classList.add('message', 'success-message');
  newElement.setAttribute('data-qa', 'notification');
  newElement.textContent = message;
  document.body.appendChild(newElement);
}

// Error handler
function handleError(errorMessage) {
  const errorElement = document.createElement('div');

  errorElement.classList.add('notification', 'error');
  errorElement.classList.add('message', 'error-message');
  errorElement.setAttribute('data-qa', 'notification');
  errorElement.textContent = errorMessage;
  document.body.appendChild(errorElement);
}

// Attach handlers
firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess).catch(handleError);
thirdPromise.then(handleSuccess).catch(handleError);
