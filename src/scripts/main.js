'use strict';

let leftClicked = false;
let rightClicked = false;

let resolveFirst;
let resolveSecond;
let resolveThird;

let timerId;

document.addEventListener('contextmenu', (ev) => {
  ev.preventDefault();
});

document.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    leftClicked = true;
    clearTimeout(timerId);
    resolveFirst('First promise was resolved');
    resolveSecond('Second promise was resolved');
  }

  if (e.button === 2) {
    rightClicked = true;
    resolveSecond('Second promise was resolved');
  }

  if (leftClicked && rightClicked) {
    resolveThird('Third promise was resolved');
  }
});

const firstPromise = new Promise((resolve, reject) => {
  resolveFirst = resolve;

  timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  resolveSecond = resolve;
});

const thirdPromise = new Promise((resolve) => {
  resolveThird = resolve;
});

function createNotification(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = message;

  if (type === 'success') {
    div.classList.add('success');
  } else {
    div.classList.add('error');
  }

  document.body.appendChild(div);
}

firstPromise
  .then((message) => createNotification(message, 'success'))
  .catch((error) => createNotification(error.message, 'error'));

secondPromise
  .then((message) => createNotification(message, 'success'))
  .catch((error) => createNotification(error.message, 'error'));

thirdPromise
  .then((message) => createNotification(message, 'success'))
  .catch((error) => createNotification(error.message, 'error'));
