'use strict';

const body = document.querySelector('body');

function createMessage(message, classAdd) {
  body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${classAdd}">${message}</div>
`);
}

new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
}).then((message) => createMessage(message, 'saccess'))
  .catch((message) => createMessage(message, 'warning'));

new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
}).then((message) => createMessage(message, 'saccess'));

let leftClick = false;
let rightClick = false;

new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
}).then((message) => createMessage(message, 'saccess'));
