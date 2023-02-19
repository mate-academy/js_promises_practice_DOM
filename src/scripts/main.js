'use strict';

const body = document.querySelector('body');

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function showMessage(type, text) {
  body.insertAdjacentHTML(
    'beforeend', `
      <div data-qa="notification" class="${type}">${text}</div>
    `);
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', resolve);
  setTimeout(() => reject(new Error()), 3000);
});

firstPromise
  .then(() => showMessage('success', 'First promise was resolved'))
  .catch(() => showMessage('warning', 'Error: First promise was rejected'));

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

secondPromise
  .then(() => showMessage('success', 'Second promise was resolved'));

const thirdPromise = new Promise((resolve) => {
  let leftBtn = false;
  let rightBtn = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftBtn = true;
    }

    if (e.button === 2) {
      rightBtn = true;
    }

    if (leftBtn === true && rightBtn === true) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => showMessage('success', 'Third promise was resolved'));
