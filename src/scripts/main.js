'use strict';

document.oncontextmenu = () => false;

const buttonState = { left: false, right: false };
let resetTimeout;

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.buttons === 1) {
      return resolve('First');
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.buttons === 1 || e.buttons === 2) {
      return resolve('Second');
    }
  });
});

const promise3 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      buttonState.left = true;
    } else if (e.button === 2) {
      buttonState.right = true;
    }

    if (buttonState.left && buttonState.right) {
      resolve('Third');
      buttonState.left = false;
      buttonState.right = false;
    }

    clearTimeout(resetTimeout);

    resetTimeout = setTimeout(() => {
      buttonState.left = false;
      buttonState.right = false;
    }, 500);
  });
});

const handleSuccess = (message) => {
  const successDiv = document.createElement('div');

  successDiv.setAttribute('data-qa', 'notification');
  successDiv.className = 'success';
  successDiv.textContent = `${message} promise was resolved`;
  document.body.appendChild(successDiv);
};

const handleError = (error) => {
  const errorDiv = document.createElement('div');

  errorDiv.setAttribute('data-qa', 'notification');
  errorDiv.className = 'error';
  errorDiv.textContent = error.message;
  document.body.appendChild(errorDiv);
};

promise1.then(handleSuccess).catch(handleError);
promise2.then(handleSuccess).catch(handleError);
promise3.then(handleSuccess).catch(handleError);
