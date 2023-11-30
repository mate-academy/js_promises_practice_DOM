'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstClick = 0;
const lastClick = 3;

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

    if (e.button === firstClick || e.button === lastClick) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRigthClicked = false;

  bodyElement.addEventListener('mousedown', (e) => {
    if (e.button === firstClick) {
      isLeftClicked = true;
    }

    if (e.button === lastClick) {
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
