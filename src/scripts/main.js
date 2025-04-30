'use strict';

function createNotification(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(isError ? 'error' : 'success');
  div.textContent = message;
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds'));
  }, 3000);

  const onClick = (e) => {
    clearTimeout(timerId);
    resolve('First promise was resolved on a left click');
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('click', onClick);
});

firstPromise
  .then((message) => {
    createNotification(message, false);
  })
  .catch((error) => {
    createNotification(error.message, true);
  });

const secondPromise = new Promise((resolve) => {
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

secondPromise.then((message) => {
  createNotification(message, false);
});

const clicks = new Set();

const thirdPromise = new Promise((resolve) => {
  const counter = (e) => {
    if (e.button === 0 || e.button === 2) {
      clicks.add(e.button);
    }

    if (clicks.has(0) && clicks.has(2)) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', counter);
    }
  };

  document.addEventListener('mousedown', counter);
});

thirdPromise.then((message) => {
  createNotification(message, false);
});
