'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;
  const body = document.querySelector('body');

  body.addEventListener('click', (click) => {
    clicked = true;
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected!'));
    }
  }, 3000);
});

firstPromise
  .then((message) => {
    const success = document.createElement('div');

    success.classList.add('success');
    success.setAttribute('data-qa', 'notification');

    document.body.appendChild(success);
  })
  .catch((message) => {
    const error = document.createElement('div');

    error.classList.add('error');
    error.setAttribute('data-qa', 'notification');

    document.body.appendChild(error);
  });
