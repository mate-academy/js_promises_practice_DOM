'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

let firstClick = false;
let secondClick = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    firstClick = true;

    if (firstClick === true && secondClick === true) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', () => {
    secondClick = true;

    if (firstClick === true && secondClick === true) {
      resolve();
    }
  });
});

firstPromise
  .then(() => onSuccess(`First promise was resolved`))
  .catch((text) => onError(text));

secondPromise
  .then(() => onSuccess(`Second promise was resolved`));

thirdPromise
  .then(() => onSuccess('Third promise was resolved'));

function onSuccess(text) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'success';
  div.textContent = text;

  body.appendChild(div);
};

function onError(text) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'warning';
  div.textContent = text;

  body.appendChild(div);
};
