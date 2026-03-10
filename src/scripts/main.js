'use strict';

function showMessage(type, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;
  document.body.append(div);
}

let firstResolved = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      firstResolved = true;
      resolve('First promise was resolved');
    },
    { once: true },
  );

  setTimeout(() => {
    if (!firstResolved) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const resolveSecond = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', resolveSecond, { once: true });

  document.addEventListener(
    'contextmenu',
    (evt) => {
      evt.preventDefault();
      resolveSecond();
    },
    { once: true },
  );
});

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const check = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;
    check();
  });

  document.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
    rightClicked = true;
    check();
  });
});

function successHandler(message) {
  showMessage('success', message);
}

function errorHandler(error) {
  showMessage('error', error.message);
}

firstPromise.then(successHandler).catch(errorHandler);

secondPromise.then(successHandler).catch(errorHandler);

thirdPromise.then(successHandler).catch(errorHandler);
