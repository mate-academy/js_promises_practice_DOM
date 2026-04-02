'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = type;
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  const handler = (e) => {
    if (e.button === 0) {
      clicked = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', handler);
    }
  };

  document.addEventListener('click', handler);

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', handler);
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handler);
    }
  };

  document.addEventListener('click', handler);
});

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handler);
    }
  };

  document.addEventListener('click', handler);
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err, 'error'));

secondPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err, 'error'));

thirdPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err, 'error'));
