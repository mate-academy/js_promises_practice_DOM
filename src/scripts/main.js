'use strict';

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise
  .then((message) => handler(message, 'success'))
  .catch((error) => handler(error.message, 'error'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => handler(message, 'success'));

const thirdPromise = new Promise((resolve) => {
  function checkBothClicks() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClick = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    checkBothClicks();
  });
});

thirdPromise.then((message) => handler(message, 'success'));

function handler(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = type;
  notification.textContent = message;
  document.body.appendChild(notification);
}
