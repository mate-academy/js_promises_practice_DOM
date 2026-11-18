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

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

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

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = message;

  document.body.append(notification);
}

firstPromise
  .then((message) => {
    showNotification(message, 'succes');
  })
  .catch((error) => {
    showNotification(error, 'error');
  });

secondPromise
  .then((message) => {
    showNotification(message, 'succes');
  })
  .catch((error) => {
    showNotification(error, 'error');
  });

thirdPromise
  .then((message) => {
    showNotification(message, 'succes');
  })
  .catch((error) => {
    showNotification(error, 'error');
  });
