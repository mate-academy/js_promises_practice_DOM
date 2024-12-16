'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      leftClick = true;
    } else if (ev.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = (message) => {
  const successDiv = document.createElement('div');

  successDiv.className = 'success';
  successDiv.setAttribute('data-qa', 'notification');
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
};

const errorHandler = (error) => {
  const errorDiv = document.createElement('div');

  errorDiv.className = 'error';
  errorDiv.setAttribute('data-qa', 'notification');
  errorDiv.textContent = error.message;
  document.body.appendChild(errorDiv);
};

firstPromise.then(successHandler).catch(errorHandler);

secondPromise.then(successHandler).catch(errorHandler);

thirdPromise.then(successHandler).catch(errorHandler);

document.addEventListener('contextmenu', (ev) => {
  ev.preventDefault();
});
