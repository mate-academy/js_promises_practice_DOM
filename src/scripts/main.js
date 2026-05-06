'use strict';

let left = false;
let right = false;
let resolveThird;
// eslint-disable-next-line no-unused-vars
let rejectThird;

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
    div.textContent = result;
    document.body.appendChild(div);
  });

  // eslint-disable-next-line handle-callback-err
  firstPromise.catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(`error`);
    div.textContent = error;
    document.body.appendChild(div);
  });
});

// eslint-disable-next-line no-shadow
document.addEventListener('mousedown', (event) => {
  event.preventDefault();

  const secondPromise = new Promise((resolve, reject) => {
    if (event.buttons === 1 || event.buttons === 2) {
      resolve(`Second promise was resolved`);
    }
  });

  secondPromise.then((result) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(`success`);
    div.textContent = result;
    document.body.appendChild(div);
  });

  // eslint-disable-next-line handle-callback-err
  secondPromise.catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(`error`);
    div.textContent = error;
    document.body.appendChild(div);
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  resolveThird = resolve;
  rejectThird = reject;
});

thirdPromise.then((result) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(`success`);
  div.textContent = result;
  document.body.appendChild(div);
});

// eslint-disable-next-line handle-callback-err
thirdPromise.catch((error) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(`error`);
  div.textContent = error;
  document.body.appendChild(div);
});

// eslint-disable-next-line no-shadow
document.addEventListener('mousedown', (event) => {
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
    // eslint-disable-next-line no-undef
    resolveThird(`Third promise was resolved`);
    left = false;
    right = false;
  }
});
