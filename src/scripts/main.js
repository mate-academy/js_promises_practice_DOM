'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = 0;
const lastPromise = 3;

const bodyElement = document.querySelector('body');

function handleSuccess(promiseString) {
  const sucssesElement = document.createElement('div');

  sucssesElement.classList.add('success');
  sucssesElement.dataset.qa = 'notification';
  sucssesElement.innerText = promiseString;
  bodyElement.appendChild(sucssesElement);
}

function handleError(error) {
  const errorElement = document.createElement('div');

  errorElement.classList.add('warning');
  errorElement.dataset.qa = 'notification';
  errorElement.innerText = error.message;
  bodyElement.appendChild(errorElement);
}

const promise1 = new Promise((resolve, reject) => {
  bodyElement.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === firstPromise || e.button === lastPromise) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRigthClicked = false;

  bodyElement.addEventListener('mousedown', (e) => {
    if (e.button === firstPromise) {
      isLeftClicked = true;
    }

    if (e.button === lastPromise) {
      isRigthClicked = true;
    }

    if (isLeftClicked && isRigthClicked) {
      resolve('Third promise was resolved');
    }
  });
});

promise1.then(handleSuccess)
  .catch(handleError);

promise2.then(handleSuccess);

promise3.then(handleSuccess);
