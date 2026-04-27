'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');
  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;

  document.body.appendChild(div);
}

// FIRST PROMISE
const firstPromise = new Promise((resolve, reject) => {
  const handler = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('click', handler);
    }
  };

  document.addEventListener('click', handler);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

// SECOND PROMISE
const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
      cleanup();
    }
  };

  const rightClickHandler = (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
    cleanup();
  };

  function cleanup() {
    document.removeEventListener('click', clickHandler);
    document.removeEventListener('contextmenu', rightClickHandler);
  }

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', rightClickHandler);
});

// THIRD PROMISE
let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      check();
    }
  };

  const rightClickHandler = (e) => {
    e.preventDefault();
    rightClicked = true;
    check();
  };

  function check() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      cleanup();
    }
  }

  function cleanup() {
    document.removeEventListener('click', clickHandler);
    document.removeEventListener('contextmenu', rightClickHandler);
  }

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', rightClickHandler);
});

// HANDLERS

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

secondPromise
  .then((msg) => showNotification(msg, 'success'));

thirdPromise
  .then((msg) => showNotification(msg, 'success'));