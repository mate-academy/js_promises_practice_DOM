'use strict';

const showNotification = (message, type) => {
  const messageEl = document.createElement('div');

  messageEl.className = type;
  messageEl.setAttribute('data-qa', 'notification');
  messageEl.textContent = message;
  document.body.append(messageEl);
};

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      document.removeEventListener('mousedown', handleClick);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleClick);

  setTimeout(() => {
    document.removeEventListener('mousedown', handleClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', handleClick);

      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleClick);
});

secondPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

const thirdPromise = new Promise((resolve) => {
  let hasLeftClick = false;
  let hasRightClick = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      hasLeftClick = true;
    }

    if (e.button === 2) {
      hasRightClick = true;
    }

    if (hasLeftClick && hasRightClick) {
      document.removeEventListener('mousedown', handleClick);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleClick);
});

thirdPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

document.addEventListener('contextmenu', (e) => e.preventDefault());
