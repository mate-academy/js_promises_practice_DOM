'use strict';

const doc = document;

doc.addEventListener('contextmenu', (e) => e.preventDefault());

const firstPromise = new Promise((resolve, reject) => {
  let isResolved = false;

  doc.addEventListener('click', () => {
    if (!isResolved) {
      isResolved = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!isResolved) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  let isLeftClick = false;
  let isRightClick = false;

  doc.addEventListener('mousedown', function (e) {
    if (e.button === 0) {
      isLeftClick = true;
    }

    if (e.button === 2) {
      isRightClick = true;
    }

    if (isLeftClick || isRightClick) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClick = false;
  let isRightClick = false;

  doc.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      isLeftClick = true;
    } else if (e.button === 2) {
      isRightClick = true;
    }

    if (isLeftClick && isRightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function showNotification(text, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = text;

  document.body.append(notification);
}

firstPromise
  .then((resultMessage) => showNotification(resultMessage, 'success'))
  .catch((errorMessage) => showNotification(errorMessage, 'error'));

secondPromise
  .then((resultMessage) => showNotification(resultMessage, 'success'))
  .catch((errorMessage) => showNotification(errorMessage, 'error'));

thirdPromise
  .then((resultMessage) => showNotification(resultMessage, 'success'))
  .catch((errorMessage) => showNotification(errorMessage, 'error'));
