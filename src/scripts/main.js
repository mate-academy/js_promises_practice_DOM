'use strict';

const { body } = document;

function createDiv(divClass, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = message;
  div.className = divClass;

  body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);

  body.addEventListener(
    'click',
    () => resolve('First promise was resolved')
  );
});

firstPromise
  .then(result => createDiv('success', result))
  .catch(errorMsg => createDiv('error', errorMsg));

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', ({ button }) => {
    if (button === 0 || button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then(result => createDiv('success', result))
  .catch(errorMsg => createDiv('error', errorMsg));

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

thirdPromise
  .then(result => createDiv('success', result))
  .catch(errorMsg => createDiv('error', errorMsg));
