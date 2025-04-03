/* eslint-disable no-shadow */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
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

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (event) => {
    if (event.buttons === 3) {
      resolve('Third promise was resolved');
    }
  });
});

function showNotification(messageText, isError = false) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isError ? 'error' : 'success';
  notification.innerText = messageText;
  document.querySelector('body').append(notification);

  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

firstPromise
  .then((message) => {
    showNotification(message);
  })
  .catch((error) => {
    showNotification(error.message);
  });

secondPromise
  .then((message) => {
    showNotification(message);
  })
  .catch((error) => {
    showNotification(error.message);
  });

thirdPromise
  .then((message) => {
    showNotification(message);
  })
  .catch((error) => {
    showNotification(error.message);
  });
