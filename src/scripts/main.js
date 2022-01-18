'use strict';

const body = document.querySelector('body');

function createPromis() {
  const resolver = (resolve, reject) => {
    body.addEventListener('mousedown', () => {
      resolve();
    });

    setTimeout(() => {
      reject();
    }, 3000);
  };

  return new Promise(resolver);
}

function createPromis2() {
  const resolver = (resolve) => {
    body.addEventListener('mousedown', e => {
      if (e.button === 0 || e.button === 2) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
}

function createPromis3() {
  const resolver = (resolve) => {
    let leftButton = false;
    let rightButton = false;

    body.addEventListener('mousedown', e => {
      if (e.button === 0) {
        leftButton = true;
      }

      if (e.button === 2) {
        rightButton = true;
      }

      if (leftButton && rightButton) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
}

const promise1 = createPromis();
const promise2 = createPromis2();
const promise3 = createPromis3();

promise1
  .then(() => showMessage('First promise was resolved'))
  .catch(() => showMessage('First promise was rejected', 'warning'));

promise2
  .then(() => showMessage('Second promise was resolved'));

promise3
  .then(() => showMessage('Third promise was resolved'));

function showMessage(text, cls = 'success') {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="message ${cls}">
    ${text}</div>`);
};
