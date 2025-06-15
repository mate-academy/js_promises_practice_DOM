'use strict';

const showNotification = (message, type) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.innerHTML = message;
  div.className = type === 'success' ? 'success' : 'error';
  document.body.appendChild(div);
};

// FIRST PROMISE
const firstPromise = new Promise((resolve, reject) => {
  let isResolved = false;

  const handleClick = (e) => {
    // Left click
    if (e.button === 0) {
      isResolved = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    if (!isResolved) {
      reject(Error('First promise was rejected'));
      document.removeEventListener('click', handleClick);
    }
  }, 3000);
});

// SECOND PROMISE
const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    // Left or Right click
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    }
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

// THIRD PROMISE
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

// HANDLERS
firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

secondPromise.then((message) => showNotification(message, 'success'));

thirdPromise.then((message) => showNotification(message, 'success'));
