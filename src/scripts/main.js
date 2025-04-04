'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type); // "success" or "error"
  div.textContent = message;
  document.body.appendChild(div);
}

// ========== FIRST PROMISE ==========
let firstPromiseResolved = false;
let firstPromiseRejected = false;

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    if (!firstPromiseResolved) {
      firstPromiseRejected = true;
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  const handleClick = (e) => {
    if (e.button === 0 && !firstPromiseResolved && !firstPromiseRejected) {
      firstPromiseResolved = true;
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err, 'error'));

// ========== SECOND PROMISE ==========
let secondPromiseResolved = false;

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if ((e.button === 0 || e.button === 2) && !secondPromiseResolved) {
      secondPromiseResolved = true;
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
});

secondPromise.then((msg) => showNotification(msg, 'success'));

// ========== THIRD PROMISE ==========
let leftClickHappened = false;
let rightClickHappened = false;
let thirdPromiseResolved = false;

const thirdPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftClickHappened = true;
    }

    if (e.button === 2) {
      rightClickHappened = true;
    }

    if (leftClickHappened && rightClickHappened && !thirdPromiseResolved) {
      thirdPromiseResolved = true;
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
});

thirdPromise.then((msg) => showNotification(msg, 'success'));

// Enable right-click for Cypress compatibility
document.addEventListener('contextmenu', (e) => e.preventDefault());
