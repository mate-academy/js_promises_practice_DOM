'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 1 || e.button === 2) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

promise1.then(message => onSuccess(message))
  .catch(message => onError(message));

promise2.then(message => onSuccess(message));

promise3.then(message => onSuccess(message));

function onSuccess(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'success';
  div.textContent = message;

  body.append(div);
}

function onError(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'warning';
  div.textContent = message;

  body.append(div);
}
