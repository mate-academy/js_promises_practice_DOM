'use strict';

function notification(type, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = message;
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((result) => notification('success', result))
  .catch((error) => notification('error', error));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((result) => notification('success', result))
  .catch(() => notification('error', 'Second promise was rejected'));

const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((result) => notification('success', result))
  .catch(() => notification('error', 'Third promise was rejected'));
