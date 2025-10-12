'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  const timeoutId = setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0 && !clicked) {
        clicked = true;
        clearTimeout(timeoutId);
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  let clickLeftMouse = false;
  let clickRightMouse = false;
  let resolved = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clickLeftMouse = true;
    }

    if (e.button === 2) {
      clickRightMouse = true;
    }

    if (clickLeftMouse && clickRightMouse && !resolved) {
      resolved = true;
      resolve('Third promise was resolved');
    }
  });
});

function showNotification(type, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err.message));

secondPromise
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err.message));

thirdPromise
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err.message));

document.addEventListener('contextmenu', (e) => e.preventDefault());
