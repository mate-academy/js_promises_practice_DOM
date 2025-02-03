'use strict';

const body = document.body;
let leftClickHappened = false;
let rightClickHappened = false;
let isResolved = true;

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClickHappened = true;
    }

    if (e.button === 2) {
      rightClickHappened = true;
    }

    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
    }
  });
});

const showMessage = (message, res) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;

  if (res) {
    notification.classList.add('success');
  } else {
    notification.classList.add('error');
  }

  body.appendChild(notification);
};

firstPromise
  .then((message) => {
    showMessage(message, isResolved);
  })
  .catch((message) => {
    isResolved = false;
    showMessage(message, 'error');
  });

secondPromise.then((message) => {
  isResolved = true;
  showMessage(message, isResolved);
});

thirdPromise.then((message) => showMessage(message, isResolved));
