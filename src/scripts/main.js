/* eslint-disable prettier/prettier */
/* eslint-disable prefer-promise-reject-errors */
'use strict';

const body = document.querySelector('body');

function createMessage(text, className) {
  const message = document.createElement('div');

  message.textContent = text;
  message.className = className;
  message.dataset.qa = 'notification';

  body.append(message);
}

let resolveFirstPromise;
let rejectFirstPromise;
let resolveSecondPromise;
let resolveThirdPromise;

let isLMBClicked = false;
let isRMBClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  resolveFirstPromise = resolve;

  rejectFirstPromise = setTimeout(
    () => reject('First promise was rejected'),
    3000,
  );
});

const secondPromise = new Promise((resolve) => {
  resolveSecondPromise = resolve;
});

const thirdPromise = new Promise((resolve) => {
  resolveThirdPromise = resolve;
});

document.addEventListener('click', () => {
  isLMBClicked = true;

  clearTimeout(rejectFirstPromise);

  resolveFirstPromise('First promise was resolved');
  resolveSecondPromise('Second promise was resolved');

  if (isLMBClicked && isRMBClicked) {
    resolveThirdPromise('Third promise was resolved');
  }
});

document.addEventListener('contextmenu', () => {
  isRMBClicked = true;

  resolveSecondPromise('Second promise was resolved');

  if (isLMBClicked && isRMBClicked) {
    resolveThirdPromise('Third promise was resolved');
  }
});

firstPromise
  .then((message) => createMessage(message, 'success'))
  .catch((message) => createMessage(message, 'error'));

secondPromise.then((message) => createMessage(message, 'success'));

thirdPromise.then((message) => createMessage(message, 'success'));
