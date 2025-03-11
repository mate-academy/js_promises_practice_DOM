'use strict';

document.addEventListener('contextmenu', (e) => e.preventDefault());

const showNotification = (message, type) => {
  const notificationHTML = `<div class="${type}" data-qa="notification">${message}</div>`;

  document.body.insertAdjacentHTML('afterbegin', notificationHTML);
};

const showSuccess = (message) => showNotification(message, 'success');
const showError = (message) => showNotification(message, 'error');

const leftClickOrTimeoutPromise = new Promise((resolve, reject) => {
  const handleLeftClick = (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleLeftClick);
      resolve();
    }
  };

  document.addEventListener('click', handleLeftClick);

  const timeoutId = setTimeout(() => {
    document.removeEventListener('click', handleLeftClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const anyClickPromise = new Promise((resolve) => {
  const handleAnyClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('click', handleAnyClick);
      document.removeEventListener('contextmenu', handleAnyClick);
      resolve();
    }
  };

  document.addEventListener('click', handleAnyClick);
  document.addEventListener('contextmenu', handleAnyClick);
});

const bothClicksPromise = Promise.all([
  new Promise((resolve) => {
    const handleLeftClick = (e) => {
      if (e.button === 0) {
        document.removeEventListener('click', handleLeftClick);
        resolve();
      }
    };

    document.addEventListener('click', handleLeftClick);
  }),

  new Promise((resolve) => {
    const handleRightClick = (e) => {
      if (e.button === 2) {
        document.removeEventListener('contextmenu', handleRightClick);
        resolve();
      }
    };

    document.addEventListener('contextmenu', handleRightClick);
  }),
]);

leftClickOrTimeoutPromise
  .then(() => showSuccess('First promise was resolved'))
  .catch((error) => showError(error.message));

anyClickPromise.then(() => showSuccess('Second promise was resolved'));

bothClicksPromise.then(() => showSuccess('Third promise was resolved'));
