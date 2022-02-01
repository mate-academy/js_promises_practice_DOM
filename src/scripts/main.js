'use strict';

const body = document.querySelector('body');

function createNewMessage(newClass, text) {
  body.insertAdjacentHTML('beforeend', `
    <div class=${newClass} data-qa="notification"><p>${text}</p></div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    createNewMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    createNewMessage('warning', 'First promise was rejected');
  });

secondPromise
  .then(() => {
    createNewMessage('success', 'Second promise was resolved');
  });

thirdPromise
  .then(() => {
    createNewMessage('success', 'Third promise was resolved');
  });
