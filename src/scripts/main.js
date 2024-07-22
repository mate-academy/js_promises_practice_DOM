'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved on a left click in the document');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClickHappened = true;
    }

    if (e.button === 2) {
      rightClickHappened = true;
    }

    if (leftClickHappened && rightClickHappened) {
      resolve(
        'Third promise was resolved after both left and right clicks happened',
      );
    }
  });
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

secondPromise.then((message) => showNotification(message, 'success'));

thirdPromise.then((message) => showNotification(message, 'success'));

document.addEventListener('contextmenu', (e) => e.preventDefault());
