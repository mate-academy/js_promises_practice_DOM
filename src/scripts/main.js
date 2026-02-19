/* eslint-disable prefer-promise-reject-errors */

'use strict';

let rightClick = false;
let leftClick = false;

function createNotification(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
}

function clear(onLeft, onRight) {
  document.removeEventListener('click', onLeft);
  document.removeEventListener('contextmenu', onRight);
}

const firstPromise = new Promise((resolve, reject) => {
  function onLeft() {
    leftClick = true;
    clearTimeout(timerId);
    resolve(`First promise was resolved`);
    document.removeEventListener('click', onLeft);
  }

  const timerId = setTimeout(() => {
    reject('First promise was rejected');
    document.removeEventListener('click', onLeft);
  }, 3000);

  document.addEventListener('click', onLeft);
});

firstPromise
  .then((data) => createNotification(data, 'success'))
  .catch((errorMessage) => createNotification(errorMessage, 'error'));

const secondPromise = new Promise((resolve) => {
  function onLeft() {
    leftClick = true;
    resolve(`Second promise was resolved`);
    clear(onLeft, onRight);
  }

  function onRight() {
    rightClick = true;
    resolve(`Second promise was resolved`);
    clear(onLeft, onRight);
  }

  document.addEventListener('contextmenu', onRight);

  document.addEventListener('click', onLeft);
});

secondPromise
  .then((data) => createNotification(data, 'success'))
  .catch((errorMessage) => createNotification(errorMessage, 'error'));

const thirdPromise = new Promise((resolve) => {
  function onLeft() {
    leftClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
      clear(onLeft, onRight);
    }
  }

  function onRight() {
    rightClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
      clear(onLeft, onRight);
    }
  }

  document.addEventListener('contextmenu', onRight);

  document.addEventListener('click', onLeft);
});

thirdPromise
  .then((data) => createNotification(data, 'success'))
  .catch((errorMessage) => createNotification(errorMessage, 'error'));
