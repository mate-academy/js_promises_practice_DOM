'use strict';

const logo = document.querySelector('.logo');
const body = document.querySelector('body');

function showMessage(text, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(isError ? 'error' : 'success');
  div.textContent = text;
  body.append(div);
}

const promise1 = new Promise((resolve, reject) => {
  const timer = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  logo.addEventListener(
    'click',
    (eve) => {
      if (eve.button === 0) {
        clearTimeout(timer);
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

const promise2 = new Promise((resolve) => {
  logo.addEventListener(
    'mousedown',
    (eve) => {
      if (eve.button === 0 || eve.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const promise3 = new Promise((resolve) => {
  logo.addEventListener(
    'mousedown',
    (eve) => {
      if (eve.buttons === 3) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );
});

promise1
  .then((message) => showMessage(message))
  .catch((error) => showMessage(error.message, true));

promise2.then((message) => showMessage(message));
promise3.then((message) => showMessage(message));
