/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
'use strict';

document.addEventListener('contextmenu', (e) => e.preventDefault());

const body = document.querySelector('body');
const notification = document.createElement('div');

notification.dataset.qa = 'notification';

const handleSuccess = (msg) => {
  const successMsg = notification.cloneNode();

  successMsg.classList.add('success');
  successMsg.textContent = msg;
  body.append(successMsg);
};

const handleError = (msg) => {
  const errorMsg = notification.cloneNode();

  errorMsg.classList.add('error');
  errorMsg.textContent = msg;
  body.append(errorMsg);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject('First promise was rejected'), 3000);
})
  .then(handleSuccess)
  .catch(handleError);

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if ([0, 2].includes(e.button)) {
      resolve('Second promise was resolved');
    }
  });
})
  .then(handleSuccess)
  .catch(handleError);

const thirdPromise = new Promise((resolve) => {
  let count = 0;

  const tryResolve = () => {
    if (count === 2) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener(
    'click',
    () => {
      count += 1;
      tryResolve();
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      count += 1;
      tryResolve();
    },
    { once: true },
  );
})
  .then(handleSuccess)
  .catch(handleError);
