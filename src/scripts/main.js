'use strict';

function showNotification(type, message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = message;
  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  let isClicked = false; // Прапорець, щоб знати, чи встигли ми

  const clickHandler = () => {
    if (!isClicked) {
      isClicked = true;
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    if (!isClicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err.message));

const secondPromise = new Promise((resolve, reject) => {
  const anyClickHandler = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', anyClickHandler);
  document.addEventListener('contextmenu', anyClickHandler);
});

secondPromise
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err.message));

const thirdPromise = new Promise((resolve, reject) => {
  let hasLeftClick = false;
  let hasRightClick = false;

  const checkBothClicks = () => {
    if (hasLeftClick && hasRightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    hasLeftClick = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', () => {
    hasRightClick = true;
    checkBothClicks();
  });
});

thirdPromise
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err.message));
