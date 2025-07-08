'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let isResolved = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      if (!isResolved) {
        isResolved = true;
        resolve(`First promise was resolved`);
      }
    }
  });

  setTimeout(() => {
    if (!isResolved) {
      isResolved = true;
      reject(Error(`First promise was rejected`));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve(`Second promise was resolved`);
      }
    },
    { once: true },
  );
});

let isRight = false;
let isLeft = false;

const thirdPromise = new Promise((resolve) => {
  const handleMouseDown = (e) => {
    e.preventDefault();

    if (e.button === 0) {
      isLeft = true;
    }

    if (e.button === 2) {
      isRight = true;
    }

    if (isLeft && isRight) {
      resolve(`Third promise was resolved`);

      document.removeEventListener('mousedown', handleMouseDown);
    }
  };

  document.addEventListener('mousedown', handleMouseDown);
});

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = message;

  document.body.appendChild(notification);
}

firstPromise.then(
  () => showNotification(`First promise was resolved`, 'success'),
  () => showNotification(`First promise was rejected`, 'error'),
);

secondPromise.then(
  () => showNotification(`Second promise was resolved`, 'success'),
  () => showNotification(`Second promise was rejected`, 'error'),
);

thirdPromise.then(
  () => showNotification(`Third promise was resolved`, 'success'),
  () => showNotification(`Third promise was rejected`, 'error'),
);
