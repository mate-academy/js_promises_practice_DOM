'use strict';

function showNotification(message, type = 'success') {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = type;
  div.textContent = message;
  document.body.appendChild(div);
}

const REJECT_PROMISE_TIME = 3000;
const promise1 = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', clickHandler);
  }, REJECT_PROMISE_TIME);

  function clickHandler(e) {
    if (e.button === 0) {
      clearTimeout(timeout);
      resolve('First promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  }

  document.addEventListener('click', clickHandler);
});

const promise2 = new Promise((resolve) => {
  function clickHandler(e) {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  }

  document.addEventListener('click', clickHandler);
});

const promise3 = new Promise((resolve) => {
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

      document.removeEventListener('click', clickHandler);
    }
  }

  document.addEventListener('click', clickHandler);
});

promise1
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

promise2.then((msg) => showNotification(msg, 'success'));

promise3.then((msg) => showNotification(msg, 'success'));
