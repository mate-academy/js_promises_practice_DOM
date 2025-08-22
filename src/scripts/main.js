'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        return resolve('First promise was resolved');
      }
    },
    { once: true },
  );

  setTimeout(() => {
    return reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      return resolve('Second promise was resolved');
    }
  });
});

let leftClicked = false;
let rightClicked = false;
let thirdResolved = false;
const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (thirdResolved) {
      return;
    }

    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      thirdResolved = true;

      return resolve('Third promise was resolved');
    }
  });
});

function showNotification(message, type) {
  const div = document.createElement('div');

  div.className = type;
  div.dataset.qa = 'notification';
  div.textContent = message;

  document.body.appendChild(div);
}

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

secondPromise.then((msg) => showNotification(msg, 'success'));

thirdPromise.then((msg) => showNotification(msg, 'success'));
