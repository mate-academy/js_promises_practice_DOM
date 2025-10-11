'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Helper to create notification elements
  const showNotification = (message, isError = false) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.className = isError ? 'error' : 'success';
    div.textContent = message;
    document.body.appendChild(div);
  };

  // Track clicks
  let leftClicked = false;
  let rightClicked = false;

  // FIRST PROMISE
  const firstPromise = new Promise((resolve, reject) => {
    let resolvedOrRejected = false;

    // Left click handler
    const handleClick = (e) => {
      if (e.button === 0 && !resolvedOrRejected) {
        resolvedOrRejected = true;
        resolve('First promise was resolved');
      }
    };

    document.addEventListener('mousedown', handleClick, { once: true });

    // Reject after 3s if not clicked
    setTimeout(() => {
      if (!resolvedOrRejected) {
        resolvedOrRejected = true;
        reject(new Error('First promise was rejected'));
      }
    }, 3000);
  });

  // SECOND PROMISE
  const secondPromise = new Promise((resolve) => {
    const handleClick = (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
        document.removeEventListener('mousedown', handleClick);
      }
    };

    document.addEventListener('mousedown', handleClick);
  });

  // THIRD PROMISE
  const thirdPromise = new Promise((resolve) => {
    const handleClick = (e) => {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        document.removeEventListener('mousedown', handleClick);
      }
    };

    document.addEventListener('mousedown', handleClick);
  });

  // SUCCESS HANDLER
  const onSuccess = (message) => {
    showNotification(message, false);
  };

  // ERROR HANDLER
  const onError = (message) => {
    showNotification(message, true);
  };

  // Attach handlers
  firstPromise.then(onSuccess).catch(onError);
  secondPromise.then(onSuccess).catch(onError);
  thirdPromise.then(onSuccess).catch(onError);
});
