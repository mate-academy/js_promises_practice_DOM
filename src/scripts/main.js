'use strict';

function showNotification(message, type) {
  let notification = document.querySelector('div[data-qa="notification"]');

  if (!notification) {
    notification = document.createElement('div');
    notification.setAttribute('data-qa', 'notification');
    document.body.appendChild(notification);
  }
  notification.textContent = message;
  notification.className = type; // success || error
}

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  function onClick(e) {
    if (e.button === 0) {
      // Left mouse button
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  }

  document.addEventListener('click', onClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', onClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  function onClick(e) {
    if (e.button === 0 || e.button === 2) {
      // Left or right button
      resolve('Second promise was resolved');
      document.removeEventListener('click', onClick);
    }
  }
  document.addEventListener('click', onClick);
});

const thirdPromise = new Promise((resolve) => {
  function onClick(e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onClick);
    }
  }
  document.addEventListener('click', onClick);
});

// Handling success and error
function handlePromise(promise) {
  promise
    .then((message) => {
      showNotification(message, 'success');
    })
    .catch((error) => {
      showNotification(error.message, 'error');
    });
}

handlePromise(firstPromise);
handlePromise(secondPromise);
handlePromise(thirdPromise);

// Allow right mouse button handling
document.addEventListener('contextmenu', (e) => e.preventDefault());
