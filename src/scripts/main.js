'use strict';

const body = document.querySelector('body');
const message = document.createElement('div');

function handleSuccess(result) {
  message.setAttribute('data-qa', 'notification');
  message.className = 'success';
  message.innerText = result;
  body.append(message);
}

function handleError(error) {
  message.setAttribute('data-qa', 'notification');
  message.className = 'warning';
  message.innerText = error;
  body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(handleSuccess)
  .catch(handleError);

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then(handleSuccess)
  .catch(null);

const thirdPromise = new Promise((resolve) => {
  let leftBtn = false;
  let rightBtn = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftBtn = true;

      if (leftBtn && rightBtn) {
        resolve('Third promise was resolved');
      }
    } else if (e.button === 2) {
      rightBtn = true;

      if (leftBtn && rightBtn) {
        resolve('Third promise was resolved');
      }
    }
  });
});

thirdPromise
  .then(handleSuccess);
