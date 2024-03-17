/* eslint-disable prefer-promise-reject-errors */
'use strict';

const body = document.querySelector('body');

const successHandler = (message) => {
  const successDiv = document.createElement('div');

  successDiv.className = 'success';
  successDiv.dataset.qa = 'notification';
  successDiv.textContent = message;
  body.append(successDiv);
};

const errorHandler = (message) => {
  const errorDiv = document.createElement('div');

  errorDiv.className = 'warning';
  errorDiv.dataset.qa = 'notification';
  errorDiv.textContent = message;
  body.append(errorDiv);
};

const firstPromise = new Promise((resolve, reject) => {
  let isResolved = false;

  body.addEventListener('click', () => {
    isResolved = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!isResolved) {
      reject('First promise was rejected');
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isRightClick = false;
  let isLeftClick = false;

  const checkBothClicks = () => {
    if (isLeftClick && isRightClick) {
      resolve('Third promise was resolved');
    }
  };

  body.addEventListener('contextmenu', () => {
    isRightClick = true;
    checkBothClicks();
  });

  body.addEventListener('click', () => {
    isLeftClick = true;
    checkBothClicks();
  });
});

firstPromise.then(successHandler, errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
