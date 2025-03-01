'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;
  const body = document.querySelector('body');

  body.addEventListener('click', (click) => {
    clicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const body = document.querySelector('body');

  body.addEventListener('mousedown', (click) => {
    if (click.button === 0 || click.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  const body = document.querySelector('body');

  let leftClick = false;
  let rightClick = false;

  body.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      leftClick = true;
    } else if (click.button === 2) {
      rightClick = true;
    }

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    const success = document.createElement('div');

    success.classList.add('success');
    success.setAttribute('data-qa', 'notification');
    success.textContent = message;

    document.body.appendChild(success);
  })
  .catch((message) => {
    const error = document.createElement('div');

    error.classList.add('error');
    error.setAttribute('data-qa', 'notification');
    error.textContent = message;

    document.body.appendChild(error);
  });

secondPromise.then((message) => {
  const success = document.createElement('div');

  success.classList.add('success');
  success.setAttribute('data-qa', 'notification');
  success.textContent = message;

  document.body.appendChild(success);
});

thirdPromise.then((message) => {
  const success = document.createElement('div');

  success.classList.add('success');
  success.setAttribute('data-qa', 'notification');
  success.textContent = message;

  document.body.appendChild(success);
});
