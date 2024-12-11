'use strict';

const promise1 = new Promise((resolve, reject) => {
  let isClick = false;
  const onClick = (e) => {
    if (e.button === 0) {
      isClick = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    if (!isClick) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', onClick);
    }
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);
});

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (e) => {
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

function isSuccess(message) {
  const successMessage = document.createElement('div');

  successMessage.setAttribute('data-qa', 'notification');
  successMessage.textContent = message;
  successMessage.className = 'success';

  document.body.appendChild(successMessage);
}

function isError(message) {
  const errorMessage = document.createElement('div');

  errorMessage.setAttribute('data-qa', 'notification');
  errorMessage.textContent = message;
  errorMessage.className = 'error';

  document.body.appendChild(errorMessage);
}

promise1.then(isSuccess).catch(isError);
promise2.then(isSuccess).catch(isError);
promise3.then(isSuccess).catch(isError);
