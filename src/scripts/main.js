'use strict';

const body = document.body;

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0) {
        clearTimeout(timerId);
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  const clickHandler = function (e) {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      document.removeEventListener('mousedown', clickHandler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

const createMessage = (text, isError = false) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = isError ? 'error' : 'success';
  div.textContent = text;
  body.append(div);
};

const successHandler = (successText) => createMessage(successText);
const errorHandler = (errorText) =>
  createMessage(
    errorText instanceof Error ? errorText.message : String(errorText),
    true,
  );

firstPromise.then(successHandler, errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
