'use strict';

let leftButton = false;
let rightButton = false;

new Promise((resolve, reject) => {
  document.addEventListener('click', () => resolve());
  setTimeout(() => reject(new Error()), 3000);
}).then(() => showMessage('First promise was resolved'))
  .catch(() => showMessage('First promise was rejected', 'warning'));

new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if ((e.button === 0) || (e.button === 2)) {
      resolve();
    }
  });
}).then(() => showMessage('Second promise was resolved'));

new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
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
}).then(() => showMessage('Third promise was resolved'));

function showMessage(message, className = 'success') {
  return document.body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class='message ${className}'>${message}</div>`
  );
}

document.addEventListener('contextmenu', e => e.preventDefault());
