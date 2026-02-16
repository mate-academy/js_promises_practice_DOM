'use strict';

const body = document.body;

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

firstPromise
  .then((success) => handleSuccess(success))
  .catch((error) => handleError(error));

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((success) => handleSuccess(success))
  .catch((error) => handleError(error));

const clicks = {
  left: false,
  right: false,
};
const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    if (!clicks.right) {
      clicks.left = true;

      return;
    }

    resolve('Third promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    if (!clicks.left) {
      clicks.right = true;

      return;
    }

    resolve('Third promise was resolved');
  });
});

thirdPromise
  .then((success) => handleSuccess(success))
  .catch((error) => handleError(error));

function handleSuccess(message) {
  createDiv(message, 'success');
}

function handleError(message) {
  createDiv(message, 'error');
}

function createDiv(message, className) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(className);
  div.textContent = message;

  body.appendChild(div);
}
