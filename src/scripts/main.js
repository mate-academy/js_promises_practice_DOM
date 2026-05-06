'use strict';

let left = false;
let right = false;

// eslint-disable-next-line no-shadow
document.addEventListener('mousedown', function (event) {
  const firstPromise = new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(`First promise was rejected`);
    }, 3000);

    if (event.buttons === 1) {
      event.preventDefault();
      resolve(`First promise was resolved`);
      clearTimeout(timerId);
    }
  });

  firstPromise.then((result) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(`success`);
    document.body.appendChild(div);
  });

  // eslint-disable-next-line handle-callback-err
  firstPromise.catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(`error`);
    document.body.appendChild(div);
  });
});

// eslint-disable-next-line no-shadow
document.addEventListener('mousedown', (event) => {
  const secondPromise = new Promise((resolve, reject) => {
    if (event.buttons === 1 || event.buttons === 2) {
      event.preventDefault();
      resolve(`Second promise was resolved`);
    }
  });

  secondPromise.then((result) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(`success`);
    document.body.appendChild(div);
  });

  // eslint-disable-next-line handle-callback-err
  secondPromise.catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(`error`);
    document.body.appendChild(div);
  });
});

// eslint-disable-next-line no-shadow
document.addEventListener('mousedown', (event) => {
  const thirdPromise = new Promise((resolve, reject) => {
    if (event.buttons === 1) {
      // eslint-disable-next-line no-unused-vars
      left = true;
    }

    if (event.buttons === 2) {
      // eslint-disable-next-line no-unused-vars
      right = true;
    }

    if (left === true && right === true) {
      event.preventDefault();
      resolve(`Third promise was resolved`);
      left = false;
      right = false;
    }
  });

  thirdPromise.then((result) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(`success`);
    document.body.appendChild(div);
  });

  // eslint-disable-next-line handle-callback-err
  thirdPromise.catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(`error`);
    document.body.appendChild(div);
  });
});
