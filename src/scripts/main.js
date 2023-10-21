'use strict';

const bodyElement = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRigthClicked = false;

  bodyElement.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      isLeftClicked = true;
    }

    if (e.button === 2) {
      isRigthClicked = true;
    }

    if (isLeftClicked && isRigthClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function handleSuccess(promiseString) {
  const succssesElement = document.createElement('div');

  succssesElement.classList.add('success', 'message');
  succssesElement.dataset.qa = 'notification';
  succssesElement.innerText = promiseString;
  bodyElement.appendChild(succssesElement);
}

function handleSuccess2(promiseString) {
  const succssesElement = document.createElement('div');

  succssesElement.classList.add('success', 'message', 'message_2nd');
  succssesElement.dataset.qa = 'notification';
  succssesElement.innerText = promiseString;
  bodyElement.appendChild(succssesElement);
}

function handleSuccess3(promiseString) {
  const succssesElement = document.createElement('div');

  succssesElement.classList.add('success', 'message', 'message_3rd');
  succssesElement.dataset.qa = 'notification';
  succssesElement.innerText = promiseString;
  bodyElement.appendChild(succssesElement);
}

function handleError(error) {
  const errorElement = document.createElement('div');

  errorElement.classList.add('warning', 'message', 'error-message');
  errorElement.dataset.qa = 'notification';
  errorElement.innerText = error.message;
  bodyElement.appendChild(errorElement);
}

promise1.then(handleSuccess)
  .catch(handleError);

promise2.then(handleSuccess2);

promise3.then(handleSuccess3);
