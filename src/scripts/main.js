/* eslint-disable prefer-const */
'use strict';

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;
  let timeoutId;

  const handleLeftClick = (e) => {
    if (e.button === 0 && !resolved) {
      resolved = true;
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleLeftClick);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleLeftClick);

  timeoutId = setTimeout(() => {
    if (!resolved) {
      resolved = true;
      document.removeEventListener('mousedown', handleLeftClick);
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  const handleBothClicks = (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('mousedown', handleBothClicks);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleBothClicks);
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function showNotification(message, isSuccess) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = isSuccess ? 'success' : 'error';
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then((message) => {
    // eslint-disable-next-line no-console
    console.log(message);
    showNotification(message, true);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    showNotification(error, false);
  });

secondPromise
  .then((message) => {
    // eslint-disable-next-line no-console
    console.log(message);
    showNotification(message, true);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    showNotification(error, false);
  });

thirdPromise
  .then((message) => {
    // eslint-disable-next-line no-console
    console.log(message);
    showNotification(message, true);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    showNotification(error, false);
  });
