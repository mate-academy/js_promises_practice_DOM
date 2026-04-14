'use strict';

function showNotification(statusy, message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  document.body.appendChild(notification);

  if (!notification) {
    return;
  }
  notification.classList.remove('success', 'error');
  notification.classList.add(statusy);
  notification.textContent = message;
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  function onDown(e) {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', onDown);
      resolve('First promise was resolved');
    }
  }
  document.addEventListener('mousedown', onDown);
});

firstPromise
  .then((message) => showNotification('success', message))
  .catch((err) => showNotification('error', err.message));

const secondPromise = new Promise((resolve) => {
  function onDown(e) {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', onDown);
      resolve('Second promise was resolved');
    }
  }
  document.addEventListener('mousedown', onDown);
});

secondPromise
  .then((message) => showNotification('success', message))
  .catch((message) => showNotification('error', message));

const thirdPromise = new Promise((resolve) => {
  // eslint-disable-next-line prefer-const
  let left = false;
  // eslint-disable-next-line prefer-const
  let right = false;

  function onDown(e) {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      document.removeEventListener('mousedown', onDown);
      resolve('Third promise was resolved');
    }
  }
  document.addEventListener('mousedown', onDown);
});

thirdPromise
  .then((message) => showNotification('success', message))
  .catch((message) => showNotification('error', message));
