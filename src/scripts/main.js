'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
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
  .catch(() => {
    showNotification('First promise was rejected', 'error');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch(() => {
    showNotification('Second promise was rejected', 'error');
  });

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch(() => {
    showNotification('Third promise was rejected', 'error');
  });

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = message;

  document.body.append(notification);
}
