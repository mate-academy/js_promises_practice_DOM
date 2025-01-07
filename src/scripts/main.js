'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let isClicked = false;

  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      isClicked = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!isClicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (ev) => {
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

function showMessage(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = type;
  notification.textContent = message;

  document.body.appendChild(notification);
}

firstPromise
  .then((message) => showMessage(message, 'success'))
  .catch((message) => showMessage(message, 'error'));

secondPromise.then((message) => showMessage(message, 'success'));

thirdPromise.then((message) => showMessage(message, 'success'));

document.addEventListener('contextmenu', (ev) => ev.preventDefault());
