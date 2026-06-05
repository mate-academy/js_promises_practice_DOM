'use strict';

const notificationsEl = document.getElementById('notifications');

function notify(type, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = type;
  div.textContent = message;
  notificationsEl.prepend(div);
}

// firstPromise
let firstDone = false;

const firstPromise = new Promise((resolve, reject) => {
  function onLeft(e) {
    if (e.button !== 0 || firstDone) {
      return;
    }

    firstDone = true;
    document.removeEventListener('mousedown', onLeft);
    resolve('First promise was resolved');
  }

  document.addEventListener('mousedown', onLeft);

  setTimeout(() => {
    if (!firstDone) {
      firstDone = true;
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((msg) => notify('success', msg))
  .catch((err) => notify('error', err.message));

// secondPromise
const secondPromise = new Promise((resolve) => {
  let done = false;

  function onAnyClick(e) {
    if (done) {
      return;
    }

    if (e.button === 0 || e.button === 2) {
      done = true;
      document.removeEventListener('mousedown', onAnyClick);
      resolve('Second promise was resolved');
    }
  }

  document.addEventListener('mousedown', onAnyClick);
});

secondPromise
  .then((msg) => notify('success', msg))
  .catch((err) => notify('error', err.message));

// thirdPromise
let hasLeft = false;
let hasRight = false;
let thirdDone = false;
let thirdResolve;

const thirdPromise = new Promise((resolve) => {
  thirdResolve = resolve;
});

thirdPromise
  .then((msg) => notify('success', msg))
  .catch((err) => notify('error', err.message));

document.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    hasLeft = true;
  }

  if (e.button === 2) {
    hasRight = true;
  }

  if (hasLeft && hasRight && !thirdDone) {
    thirdDone = true;
    thirdResolve('Third promise was resolved');
  }
});

document.addEventListener('contextmenu', (e) => e.preventDefault());
