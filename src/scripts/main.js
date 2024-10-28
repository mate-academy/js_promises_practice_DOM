'use strict';

// Select the notification div
const notificationDiv = document.querySelector('[data-qa="notification"]');

// Helper function to display messages
function showNotification(message, isError = false) {
  notificationDiv.textContent = message;
  notificationDiv.className = isError ? 'error' : 'success';
  notificationDiv.style.display = 'block';

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notificationDiv.style.display = 'none';
  }, 3000);
}

// First Promise
const firstPromise = new Promise((resolve, reject) => {
  let isHandled = false; // Flag to ensure only one handler is executed

  const clickHandler = () => {
    if (!isHandled) {
      isHandled = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    if (!isHandled) {
      isHandled = true;
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', clickHandler);
    }
  }, 3000);
});

firstPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error.message, true));

// Second Promise
const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      // Left or Right click
      resolve('Second promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);
});

// Handle second promise
secondPromise.then((message) => showNotification(message));

// Third Promise
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const clickHandler = (e) => {
    if (e.button === 0) {
      // Left click
      leftClicked = true;
    } else if (e.button === 2) {
      // Right click
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);
});

// Handle third promise
thirdPromise.then((message) => showNotification(message));

// Prevent context menu on right-click
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
