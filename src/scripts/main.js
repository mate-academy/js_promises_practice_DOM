'use strict';

let resolveFirstPromise;
const firstPromise = new Promise((resolve, reject) => {
  resolveFirstPromise = resolve;

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise.then(success).catch((err) => error(err.message));

let leftClick = false;
let rightClick = false;

let resolveSecondPromise;
const secondPromise = new Promise((resolve) => {
  resolveSecondPromise = resolve;
});

secondPromise.then(success);

const thirdPromise = new Promise((resolve, reject) => {
  resolve('Third promise was resolved');
});

document.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    if (resolveFirstPromise) {
      resolveFirstPromise('First promise was resolved');
      resolveFirstPromise = null;
    }

    if (resolveSecondPromise) {
      resolveSecondPromise('Second promise was resolved');
      resolveSecondPromise = null;
    }

    leftClick = true;

    if (rightClick) {
      thirdPromise.then((message) => success(message));
      leftClick = false;
      rightClick = false;
    }
  }

  if (e.button === 2) {
    if (resolveSecondPromise) {
      resolveSecondPromise('Second promise was resolved');
      resolveSecondPromise = null;
    }
    rightClick = true;

    if (leftClick) {
      thirdPromise.then((message) => success(message));
      leftClick = false;
      rightClick = false;
    }
  }
});

function success(message) {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');
  el.classList.add('success');
  el.textContent = message;
  document.body.appendChild(el);
}

function error(message) {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');
  el.classList.add('error');
  el.textContent = message;
  document.body.appendChild(el);
}
