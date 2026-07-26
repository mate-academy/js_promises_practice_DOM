'use strict';

document.addEventListener('contextmenu', (eve) => {
  eve.preventDefault();
});

const showNotification = (text, isError = false) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = isError ? 'error' : 'success';
  div.textContent = text;
  document.body.appendChild(div);
};

const leftClickHappened = new Promise((resolve) => {
  const handler = (click) => {
    if (click.button === 0) {
      document.removeEventListener('mousedown', handler);
      resolve();
    }
  };

  document.addEventListener('mousedown', handler);
});

const rightClickHappened = new Promise((resolve) => {
  const handler = (click) => {
    if (click.button === 2) {
      document.removeEventListener('mousedown', handler);
      resolve();
    }
  };

  document.addEventListener('mousedown', handler);
});

const firstPromise = new Promise((resolve, reject) => {
  const leftClickHandler = (click) => {
    if (click.button === 0) {
      document.removeEventListener('mousedown', leftClickHandler);
      clearTimeout(timerId);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', leftClickHandler);

  const timerId = setTimeout(() => {
    document.removeEventListener('mousedown', leftClickHandler);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const clickHandler = (click) => {
    if (click.button === 0 || click.button === 2) {
      document.removeEventListener('mousedown', clickHandler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

const thirdPromise = Promise.all([leftClickHappened, rightClickHappened]).then(
  () => 'Third promise was resolved',
);

firstPromise
  .then((message) => showNotification(message, false))
  .catch((err) => showNotification(err.message, true));

secondPromise.then((message) => showNotification(message, false));

thirdPromise.then((message) => showNotification(message, false));
