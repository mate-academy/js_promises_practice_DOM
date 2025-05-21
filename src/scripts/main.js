/* eslint-disable prefer-promise-reject-errors */
'use strict';

let firstPromiseResolve, firstPromiseReject;
let isFirstSettled = false;

function showMessage(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type === 'success' ? 'success' : 'error');
  div.textContent = message;

  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  firstPromiseResolve = () => {
    if (isFirstSettled) {
      return;
    }
    isFirstSettled = true;
    resolve('First promise was resolved');
  };

  firstPromiseReject = () => {
    if (isFirstSettled) {
      return;
    }
    isFirstSettled = true;
    reject('First promise was rejected');
  };

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      firstPromiseResolve();
    }
  });

  setTimeout(() => {
    firstPromiseReject();
  }, 3000);
});

firstPromise
  .then((msg) => showMessage(msg, 'success'))
  .catch((msg) => showMessage(msg, 'error'));

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

secondPromise.then((msg) => showMessage(msg, 'success'));

let leftClicked = false;
let rightClicked = false;
let isThirdResolved = false;

const thirdPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked && !isThirdResolved) {
      isThirdResolved = true;
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

thirdPromise.then((msg) => showMessage(msg, 'success'));
