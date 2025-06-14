'use strict';

function showNotification(type, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type; // 'success' or 'error'
  div.textContent = message;
  document.getElementById('notifications').appendChild(div);
}

// Track left and right clicks
let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      // Left click
      document.removeEventListener('click', onClick);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    document.removeEventListener('click', onClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('click', onClick);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', onClick);
});

const thirdPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('click', onClick);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', onClick);
});

// Prevent context menu on right click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Handle success and errors
firstPromise
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err.message || err));

secondPromise.then((msg) => showNotification('success', msg));
// Never rejected

thirdPromise.then((msg) => showNotification('success', msg));
