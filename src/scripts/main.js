'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  const fakeClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 2,
  });

  e.target.dispatchEvent(fakeClickEvent);
});

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = type;
  notification.textContent = message;
  document.body.appendChild(notification);
}

let isFirstPromiseResolved = false;
const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0 && !isFirstPromiseResolved) {
      isFirstPromiseResolved = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    if (!isFirstPromiseResolved) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', clickHandler);
    }
  }, 3000);
});

let isSecondPromiseResolved = false;
const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {

    if (!isSecondPromiseResolved && (e.button === 0 || e.button === 2)) {
      isSecondPromiseResolved = true;
      resolve('Second promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);
});

let leftClickHappened = false;
let rightClickHappened = false;
let isThirdPromiseResolved = false;
const thirdPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (isThirdPromiseResolved) {
      return;
    }

    if (e.button === 0) {
      leftClickHappened = true;
    }

    if (e.button === 2) {
      rightClickHappened = true;
    }

    if (leftClickHappened && rightClickHappened) {
      isThirdPromiseResolved = true;
      resolve('Third promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((message) => showNotification(message, 'error'));

secondPromise.then((message) => {
  showNotification(message, 'success');
});

thirdPromise.then((message) => {
  showNotification(message, 'success');
});
