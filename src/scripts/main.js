/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable promise/param-names */
/* eslint-disable no-console */
'use strict';

const div = document.createElement('div');

div.setAttribute('data-qa', 'notification');
document.body.append(div);

const formatElement = (element, className, message) => {
  element.className = className;
  element.textContent = message;
};

const onSuccess = result => {
  const [className, message] = result;

  formatElement(div, className, message);
};

const onError = error => {
  const [className, message] = error;

  formatElement(div, className, message);
};

function waitOrClick(delay, message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(['error', message + ' rejected']), delay);

    document.addEventListener('click', () => {
      resolve(['success', message + ' resolved']);
    });
  });
}

function leftOrRight(message) {
  return new Promise(resolve => {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve(['success', message]);
      }
    });
  });
};

function leftAndRight(message) {
  return new Promise(resolve => {
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
        resolve(['success', message]);
      }
    });
  });
};

const firstPromise = waitOrClick(3000, 'First promise was');

firstPromise
  .then(onSuccess, onError);

const secondPromise = leftOrRight('Second promise was resolved');

secondPromise
  .then(onSuccess, onError);

const thirdPromise = leftAndRight('Third promise was resolved');

thirdPromise
  .then(onSuccess, onError);
