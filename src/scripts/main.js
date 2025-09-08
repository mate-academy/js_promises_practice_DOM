'use strict';

function showNotification(type, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = `notification ${type}`;
  div.textContent = message;
  document.body.appendChild(div);
}

// -------- First Promise --------
const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  function clickHandler(e) {
    if (e.button === 0) {
      // left click
      clicked = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  }

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', clickHandler);
    }
  }, 3000);
});

firstPromise
  .then((msg) => showNotification('success', msg))
  .catch((msg) => showNotification('error', msg));

// -------- Second Promise --------
const secondPromise = new Promise((resolve) => {
  function clickHandler(e) {
    if (e.button === 0 || e.button === 2) {
      // left or right click
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  }
  document.addEventListener('mousedown', clickHandler);
});

secondPromise
  .then((msg) => showNotification('success', msg))
  .catch((msg) => showNotification('error', msg)); // never rejects

// -------- Third Promise --------
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

thirdPromise
  .then((msg) => showNotification('success', msg))
  .catch((msg) => showNotification('error', msg)); // never rejects

// Prevent context menu to allow right click detection
document.addEventListener('contextmenu', (e) => e.preventDefault());
