'use strict';

const container = document.createElement('div');

container.id = 'notifications';
document.body.appendChild(container);

function showNotification(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;
  container.appendChild(div);
}

// Блокуємо дефолтне меню
document.addEventListener('contextmenu', (e) => e.preventDefault());

// ---------- 1. firstPromise ----------
const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', function handler(e) {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
      document.removeEventListener('click', handler);
    }
  });
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

// ---------- 2. secondPromise ----------
const secondPromise = new Promise((resolve) => {
  function resolveSecond(msg) {
    resolve(msg);
    document.removeEventListener('click', clickHandler);
    document.removeEventListener('contextmenu', contextHandler);
  }

  function clickHandler(e) {
    if (e.button === 0) {
      resolveSecond('Second promise was resolved');
    }
  }

  function contextHandler() {
    resolveSecond('Second promise was resolved');
  }

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', contextHandler);
});

secondPromise.then((msg) => showNotification(msg, 'success'));

// ---------- 3. thirdPromise ----------
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function check() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('contextmenu', contextHandler);
    }
  }

  function clickHandler(e) {
    if (e.button === 0) {
      leftClicked = true;
      check();
    }
  }

  function contextHandler() {
    rightClicked = true;
    check();
  }

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', contextHandler);
});

thirdPromise.then((msg) => showNotification(msg, 'success'));
