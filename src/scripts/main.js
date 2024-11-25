'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });

  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  document.addEventListener('click', () => {
    leftClickHappened = true;

    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClickHappened = true;

    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    makeNotification('success', message);
  })
  .catch((error) => {
    makeNotification('error', error.message);
  });

secondPromise.then((message) => {
  makeNotification('success', message);
});

thirdPromise.then((message) => {
  makeNotification('success', message);
});

function makeNotification(type, message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');

  if (type) {
    notification.classList.add(type);
    notification.textContent = message;
  } else {
    notification.classList.add(type);
    notification.textContent = message;
  }

  body.appendChild(notification);
}
