'use strict';

function createNotification() {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  document.body.appendChild(div);

  return div;
}

function showNotification(message, type = 'success') {
  let msgBlock = document.querySelector('div[data-qa="notification"]');

  if (!msgBlock) {
    msgBlock = createNotification();
  }

  msgBlock.className = type;
  msgBlock.textContent = message;
}

const REJECT_PROMISE_TIME = 3000;
const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
    document.removeEventListener('mousedown', clickHandler);
  }, REJECT_PROMISE_TIME);

  function clickHandler(e) {
    if (e.button === 0) {
      clearTimeout(timeout);
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  }

  document.addEventListener('mousedown', clickHandler);
});

const secondPromise = new Promise((resolve) => {
  function clickHandler(e) {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  }

  document.addEventListener('mousedown', clickHandler);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function clickHandler(e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');

      document.removeEventListener('mousedown', clickHandler);
    }
  }

  document.addEventListener('mousedown', clickHandler);
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
