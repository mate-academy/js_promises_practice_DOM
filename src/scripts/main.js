'use strict';

const logo = document.querySelector('.logo');

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
      logo.removeEventListener('mousedown', handler);
      resolve();
    }
  };

  logo.addEventListener('mousedown', handler);
});

const rightClickHappened = new Promise((resolve) => {
  const handler = (click) => {
    if (click.button === 2) {
      click.preventDefault();
      document.removeEventListener('mousedown', handler);
      resolve();
    }
  };

  document.addEventListener('mousedown', handler);
});

const firstPromise = new Promise((resolve, reject) => {
  const leftClickHandler = (click) => {
    if (click.button === 0) {
      logo.removeEventListener('mousedown', leftClickHandler);
      resolve('First promise was resolved');
    }
  };

  logo.addEventListener('mousedown', leftClickHandler);

  setTimeout(() => {
    document.removeEventListener('mousedown', leftClickHandler);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const clickHandler = (click) => {
    if (click.button === 0 || click.button === 2) {
      logo.removeEventListener('mousedown', clickHandler);
      resolve('Second promise was resolved');
    }
  };

  logo.addEventListener('mousedown', clickHandler);
});

const thirdPromise = Promise.all([leftClickHappened, rightClickHappened]).then(
  () => Promise.resolve('Third promise was resolved'),
);

firstPromise
  .then((message) => showNotification(message, false))
  .catch((err) => showNotification(err, true));

secondPromise.then((message) => showNotification(message, false));

thirdPromise.then((message) => showNotification(message, false));
