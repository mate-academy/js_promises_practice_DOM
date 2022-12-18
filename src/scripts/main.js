'use strict';

const body = document.querySelector('body');

const addElementIntoBody = (resultClass, promiseMessage) => {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class=${resultClass}>${promiseMessage}</div>
  `);
};

const resolver1 = (resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
};

const resolver2 = (resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
};

const resolver3 = (resolve) => {
  let lmbIsClicked = false;
  let rmbIsClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      lmbIsClicked = true;
    }

    if (e.button === 2) {
      rmbIsClicked = true;
    }

    if (lmbIsClicked && rmbIsClicked) {
      resolve('Third promise was resolved');
    }
  });
};

const promise1 = new Promise(resolver1);
const promise2 = new Promise(resolver2);
const promise3 = new Promise(resolver3);

promise1
  .then((result) => {
    addElementIntoBody('success', result);
  })
  .catch((result) => {
    addElementIntoBody('warning', result);
  });

promise2
  .then((result) => {
    addElementIntoBody('success', result);
  });

promise3
  .then((result) => {
    addElementIntoBody('success', result);
  });
