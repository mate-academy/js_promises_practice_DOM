'use strict';

const handleSuccess = (message) => {
  const success = document.createElement('div');

  success.classList.add('success');
  success.dataset.qa = 'notification';
  success.innerText = message;
  document.body.append(success);
};

const handleError = (message) => {
  const error = document.createElement('div');

  error.classList.add('error');
  error.dataset.qa = 'notification';
  error.innerText = message;
  document.body.append(error);
};

const firstPromise = new Promise((resolve, reject) => {
  let leftClick = false;

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
    leftClick = true;
  });

  if (!leftClick) {
    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  }
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    };
  });
});

const thirdPrimise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(handleSuccess).catch(handleError);

secondPromise.then(handleSuccess);

thirdPrimise.then(handleSuccess);
