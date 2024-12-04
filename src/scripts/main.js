/* eslint-disable max-len */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let leftClickDetected = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClickDetected = true;
      resolve('First promise was resolved on a left click in the document');
    }
  });

  setTimeout(() => {
    if (!leftClickDetected) {
      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(
        new Error(
          'Third promise was resolved only after both left and right clicks happened',
        ),
      );
    }
  });
});

const showNotification = (message, isSuccess) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('notification', isSuccess ? 'success' : 'error');
  div.textContent = message;
  document.body.appendChild(div);
};

firstPromise
  .then((message) => showNotification(message, true))
  .catch((message) => showNotification(message, false));

secondPromise.then((message) => showNotification(message, true));

thirdPromise.then((message) => showNotification(message, true));
