'use strict';

function showNotification(type, message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type); // success | error
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

// --- FIRST PROMISE ---
const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  const timeout = setTimeout(() => {
    if (!resolved) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  function handler(e) {
    if (e.button === 0) {
      document.removeEventListener('mousedown', handler);
      clearTimeout(timeout);
      resolved = true;
      resolve('First promise was resolved');
    }
  }

  document.addEventListener('mousedown', handler);
});

firstPromise
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err.message));

// --- SECOND PROMISE ---
const secondPromise = new Promise((resolve) => {
  function handler(e) {
    if (e.button === 0 || e.button === 2) {
      e.preventDefault();
      document.removeEventListener('mousedown', handler);
      resolve('Second promise was resolved');
    }
  }

  document.addEventListener('mousedown', handler);
});

secondPromise.then((msg) => showNotification('success', msg));

// --- THIRD PROMISE ---
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function handler(e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', handler);
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('mousedown', handler);
});

thirdPromise.then((msg) => showNotification('success', msg));
