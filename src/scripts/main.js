'use strict';

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateX(120%)';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// FIRST PROMISE
const firstPromise = new Promise((resolve, reject) => {
  let isClicked = false;
  const onClick = (evt) => {
    if (evt.button === 0) {
      isClicked = true;
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', onClick);
      clearTimeout(timeoutId);
    }
  };

  document.addEventListener('mousedown', onClick);

  const timeoutId = setTimeout(() => {
    if (!isClicked) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
      document.removeEventListener('mousedown', onClick);
    }
  }, 3000);
});

firstPromise.then(
  (msg) => showNotification(msg, 'success'),
  (err) => showNotification(err, 'error'),
);

// SECOND PROMISE

const secondPromise = new Promise((resolve) => {
  const onClick = (evt) => {
    if (evt.button === 0 || evt.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', onClick);
    }
  };

  document.addEventListener('mousedown', onClick);
});

secondPromise.then((msg) => showNotification(msg, 'success'));

// THIRD PROMISE

const thirdPromise = new Promise((resolve) => {
  let firstMbuttonClicked = false;
  let secondMbuttonClicked = false;
  const onClick = (evt) => {
    if (evt.button === 0) {
      firstMbuttonClicked = true;
    }

    if (evt.button === 2) {
      secondMbuttonClicked = true;
    }

    if (firstMbuttonClicked && secondMbuttonClicked) {
      resolve('Third promise was resolved');

      document.removeEventListener('mousedown', onClick);
    }
  };

  document.addEventListener('mousedown', onClick);
});

thirdPromise.then((msg) => showNotification(msg, 'success'));
