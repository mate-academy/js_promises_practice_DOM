'use strict';

const { errors } = require("@linthtml/linthtml/messages");

const body = document.body;

function addSuccessMessage(message) {
  return body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="success">${message}</div>`,
  );
}

function addErrorMessage(message) {
  return body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="error">${message}</div>`,
  );
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1.then(addSuccessMessage, addErrorMessage);

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

promise2.then(addSuccessMessage);
promise2.catch(new Error('Error in promise2'));

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mouseup', (ev) => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise3.then(addSuccessMessage);
promise3.catch(new Error('Error in promise3'));
