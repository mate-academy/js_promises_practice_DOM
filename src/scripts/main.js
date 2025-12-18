'use strict';

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        clearTimeout(timer);
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handler, { once: true });

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      handler(e);
    },
    { once: true },
  );
});

secondPromise.then((message) => showNotification(message, 'success'));

const thirdPromise = new Promise((resolve) => {
  function check() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
      check();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;
    check();
  });
});

thirdPromise.then((message) => showNotification(message, 'success'));

function showNotification(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;
  document.body.append(div);
}
