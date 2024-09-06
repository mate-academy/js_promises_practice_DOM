'use strict';

const body = document.querySelector('body');

const FIRST_PROMISE_RESOLVED_MESSAGE = 'First promise was resolved';
const FIRST_PROMISE_REJECTED_MESSAGE = 'First promise was rejected';
const SECOND_PROMISE_RESOLVED_MESSAGE = 'Second promise was resolved';
const THIRD_PROMISE_RESOLVED_MESSAGE = 'Third promise was resolved';

function createNotification(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  notification.className = type;
  body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(FIRST_PROMISE_RESOLVED_MESSAGE);
  });

  setTimeout(() => reject(new Error(FIRST_PROMISE_REJECTED_MESSAGE)), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(SECOND_PROMISE_RESOLVED_MESSAGE);
  });

  document.addEventListener('click', (e) => {
    resolve(SECOND_PROMISE_RESOLVED_MESSAGE);
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClickOccurred = false;
  let rightClickOccurred = false;

  document.addEventListener('click', () => {
    leftClickOccurred = true;

    if (rightClickOccurred) {
      resolve(THIRD_PROMISE_RESOLVED_MESSAGE);
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickOccurred = true;

    if (leftClickOccurred) {
      resolve(THIRD_PROMISE_RESOLVED_MESSAGE);
    }
  });
});

firstPromise
  .then((message) => {
    createNotification(message, 'success');
  })
  .catch((error) => {
    createNotification(error.message, 'error');
  });

secondPromise.then((message) => {
  createNotification(message, 'success');
});

thirdPromise.then((message) => {
  createNotification(message, 'success');
});
