'use strict';

const body = document.body;

function addDiv(className, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = message;
  div.className = className;

  body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);

  body.addEventListener(
    'mousedown',
    () => resolve('First promise was resolved')
  );
});

firstPromise
  .then(result => addDiv('success', result))
  .catch(error => addDiv('error', error));

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', ({ button }) => {
    if (button === 0 || button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then(result => addDiv('success', result));

const thirdPromise = new Promise(resolve => {
  let left = false;
  let right = false;

  body.addEventListener('mousedown', ({ button }) => {
    if (button === 0) {
      left = true;
    } else {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(result => addDiv('message', result));
