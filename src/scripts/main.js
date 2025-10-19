'use strict';

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isError ? 'error' : 'success';
  div.textContent = message;
  document.body.appendChild(div);

  // Гарантуємо рендер перед видаленням
  requestAnimationFrame(() => {
    setTimeout(() => div.remove(), 3000);
  });
}

// ---------------- FIRST PROMISE ----------------
const firstPromise = new Promise((resolve, reject) => {
  let settled = false;

  function cleanup() {
    document.body.removeEventListener('click', onClick);
    clearTimeout(timeoutId);
  }

  function onClick() {
    if (settled) {
      return;
    }
    settled = true;
    cleanup();
    resolve('First promise was resolved');
  }

  document.body.addEventListener('click', onClick);

  const timeoutId = setTimeout(() => {
    if (settled) {
      return;
    }
    settled = true;
    cleanup();
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message || err, true));

// ---------------- SECOND PROMISE ----------------
const secondPromise = new Promise((resolve) => {
  let resolved = false;

  function cleanup() {
    document.body.removeEventListener('click', onClick);
    document.body.removeEventListener('contextmenu', onContext);
  }

  function onClick() {
    if (resolved) {
      return;
    }
    resolved = true;
    cleanup();
    resolve('Second promise was resolved');
  }

  function onContext(e) {
    e.preventDefault();

    if (resolved) {
      return;
    }
    resolved = true;
    cleanup();
    resolve('Second promise was resolved');
  }

  document.body.addEventListener('click', onClick);
  document.body.addEventListener('contextmenu', onContext);
});

secondPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message || err, true));

// ---------------- THIRD PROMISE ----------------
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;
  let resolved = false;

  function cleanup() {
    document.body.removeEventListener('click', onClick);
    document.body.removeEventListener('contextmenu', onContext);
  }

  function onClick() {
    leftClicked = true;
    checkResolution();
  }

  function onContext(e) {
    e.preventDefault();
    rightClicked = true;
    checkResolution();
  }

  function checkResolution() {
    if (leftClicked && rightClicked && !resolved) {
      resolved = true;
      cleanup();
      resolve('Third promise was resolved');
    }
  }

  document.body.addEventListener('click', onClick);
  document.body.addEventListener('contextmenu', onContext);
});

thirdPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message || err, true));
