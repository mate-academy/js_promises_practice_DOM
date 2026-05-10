'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((error) => {
    showNotification(error.message, 'error');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      e.preventDefault();
      resolve(`Second promise was resolved`);
    }
  });
});

secondPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((error) => {
    showNotification(error.message, 'error');
  });

let hasLeftClick = false;
let hasRightClick = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      hasLeftClick = true;
    }

    if (e.button === 2) {
      hasRightClick = true;
    }

    if (hasLeftClick === true && hasRightClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((error) => {
    showNotification(error.message, 'error');
  });

function showNotification(messageText, type) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add('notification', type);
  message.textContent = messageText;
  document.body.append(message);
}
