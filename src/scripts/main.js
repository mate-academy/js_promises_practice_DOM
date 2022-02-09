'use strict';

function addElement(text) {
  document.body.insertAdjacentHTML('beforeEnd', `
    <div data-qa="notification">${text}</div>
  `);
};

const firstPromise = () => new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected').message);
  }, 3000);
});

const secondPromise = () => new Promise(resolve => {
  document.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = () => new Promise(resolve => {
  let left = false;
  let right = false;

  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      left = true;
    }

    if (ev.button === 2) {
      ev.preventDefault();
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise()
  .then(addElement)
  .catch(addElement)
  .then(() => secondPromise().then(addElement))
  .then()
  .then(() => thirdPromise().then(addElement))
  .then();
