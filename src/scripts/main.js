'use strict';

function createNotification(message, isError = false) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');

  if (isError) {
    notification.classList.add('error');
  } else {
    notification.classList.add('success');
  }

  notification.innerHTML = message;
  document.body.append(notification);
}

let rightClickHappened = false;
let leftClickHappened = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    leftClickHappened = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickHappened = true;
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    if (rightClickHappened && leftClickHappened) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    if (rightClickHappened && leftClickHappened) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    createNotification(message);
  })
  .catch((message) => {
    createNotification(message, true);
  });

secondPromise.then((message) => createNotification(message));

thirdPromise.then((message) => createNotification(message));
