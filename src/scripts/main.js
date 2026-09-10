'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    document.removeEventListener('click', handleLeftClick);
    reject(new Error('First promise was rejected'));
  }, 3000);

  function handleLeftClick() {
    clearTimeout(timerId);
    document.removeEventListener('click', handleLeftClick);
    resolve('First promise was resolved');
  }

  document.addEventListener('click', handleLeftClick);
});

const secondPromise = new Promise((resolve) => {
  function handleAnyClick() {
    document.removeEventListener('click', handleAnyClick);
    document.removeEventListener('contextmenu', handleAnyClick);
    resolve('Second promise was resolved');
  }

  document.addEventListener('click', handleAnyClick);
  document.addEventListener('contextmenu', handleAnyClick);
});

const thirdPromise = new Promise((resolve) => {
  let hasLeftClick = false;
  let hasRightClick = false;

  function checkBothClicks() {
    if (hasLeftClick && hasRightClick) {
      document.removeEventListener('click', handleLeft);
      document.removeEventListener('contextmenu', handleRight);
      resolve('Third promise was resolved');
    }
  }

  function handleLeft() {
    hasLeftClick = true;
    checkBothClicks();
  }

  function handleRight() {
    hasRightClick = true;
    checkBothClicks();
  }

  document.addEventListener('click', handleLeft);
  document.addEventListener('contextmenu', handleRight);
});

function showNotification(message, isError = false) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isError ? 'error' : 'success';
  notification.textContent = message;

  document.body.appendChild(notification);
}

firstPromise
  .then((message) => showNotification(message, false))
  .catch((error) => showNotification(error.message, true));

secondPromise
  .then((message) => showNotification(message, false))
  .catch((error) => showNotification(error.message, true));

thirdPromise
  .then((message) => showNotification(message, false))
  .catch((error) => showNotification(error.message, true));
