'use strict';

// First promise
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

// Second promise
const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (evnt) => {
    if (evnt.button === 0 || evnt.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

// Third promise
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (evnt) => {
    if (evnt.button === 0) {
      leftClicked = true;
    } else if (evnt.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved'
      + 'only after both left and right clicks happened');
    }
  });
});

// Helper function to display notifications
function showNotification(message, isSuccess) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(isSuccess ? 'success' : 'warning');
  notification.textContent = message;

  document.body.appendChild(notification);
}

// Adding success and error handlers
firstPromise
  .then((message) => {
    showNotification(message, true);
  })
  .catch((error) => {
    showNotification(error.message, false);
  });

secondPromise
  .then((message) => {
    showNotification(message, true);
  });

thirdPromise
  .then((message) => {
    showNotification(message, true);
  });
