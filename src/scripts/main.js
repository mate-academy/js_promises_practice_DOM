'use strict';

document.addEventListener('contextmenu', (e) => e.preventDefault());

const notification = (message, isError = false) => {
  const divElement = document.createElement('div');

  divElement.setAttribute('data-qa', 'notification');
  divElement.className = isError ? 'error' : 'success';
  divElement.textContent = message;

  document.body.appendChild(divElement);
};

const firstPromise = new Promise((resolve, reject) => {
  const click = (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', click);
      resolve('First promise was resolved');
    }
  };

  const timeoutId = setTimeout(() => {
    document.removeEventListener('mousedown', click);
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('mousedown', click);
});

firstPromise
  .then((message) => notification(message, false))
  .catch((error) => notification(error.message, true));

const secondPromise = new Promise((resolve) => {
  const click = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', click);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', click);
});

secondPromise.then((message) => notification(message, false));

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  const click = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('mousedown', click);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', click);
});

thirdPromise.then((message) => notification(message, false));
