'use strict';

const { body } = document;

function createDiv() {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  return div;
}

function successHandler(message) {
  const div = createDiv();

  div.textContent = message;
  div.className = 'success';

  body.appendChild(div);
}

function errorHandler(message) {
  const div = createDiv();

  div.textContent = message;
  div.className = 'error';

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
  .then(successHandler)
  .catch(errorHandler);

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', ({ button }) => {
    if (button === 0 || button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then(successHandler);

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

thirdPromise.then(successHandler);
