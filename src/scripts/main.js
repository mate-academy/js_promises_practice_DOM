/* eslint-disable no-shadow */
'use strict';

const promise1 = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

promise1.then(handleSuccess).catch(handleError);

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0 || event.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

promise2.then(handleSuccess);

let leftClick = false;
let rightClick = false;

const promise3 = new Promise((resolve) => {
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      leftClick = true;
    }

    if (event.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve(
        // eslint-disable-next-line max-len
        'Third promise was resolved only after both left and right clicks happened',
      );
    }
  });
});

promise3.then(handleSuccess);

function handleSuccess(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.textContent = message;

  document.body.append(div);
}

function handleError(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('error');
  div.textContent = message;

  document.body.append(div);
}
