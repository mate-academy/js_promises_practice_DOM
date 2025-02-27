'use strict';

// Promises
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  document.addEventListener('click', () => {
    if (rightClickHappened) {
      resolve('Third promise was resolved');
    } else {
      leftClickHappened = true;
    }
  });

  document.addEventListener('contextmenu', () => {
    if (leftClickHappened) {
      resolve('Third promise was resolved');
    } else {
      rightClickHappened = true;
    }
  });
});

// Handlers
let notificationElement;

[firstPromise, secondPromise, thirdPromise].forEach((promise) => {
  promise
    .finally(() => {
      notificationElement = document.createElement('div');
      notificationElement.dataset.qa = 'notification';
      document.body.appendChild(notificationElement);
    })
    .then((successMessage) => {
      notificationElement.textContent = successMessage;
      notificationElement.classList.add('success');
    })
    .catch((failureMessage) => {
      notificationElement.textContent = failureMessage;
      notificationElement.classList.add('error');
    });
});
