'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);

  document.addEventListener('click', (evnt) => {
    if (evnt.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved on a left click in the document');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (evnt) => {
    if (evnt.button === 0 || evnt.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (evnt) => {
    if (evnt.button === 0) {
      leftClicked = true;
    } else if (evnt.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved only'
      + ' after both left and right clicks happened');
    }
  });
});

function showNotification(message, isSuccess) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(isSuccess ? 'success' : 'warning');
  notification.textContent = message;

  document.body.appendChild(notification);
}

firstPromise
  .then((message) => showNotification(message, true))
  .catch((err) => showNotification(err.message, false));

secondPromise
  .then((message) => showNotification(message, true));

thirdPromise
  .then((message) => showNotification(message, true));
