'use strict';
let leftClickHappened = false;
let rightClickHappened = false;


const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (event) => {
    if (event.button === 0) {
      document.removeEventListener('click', clickHandler);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    document.removeEventListener('click', clickHandler);
    reject('First promise was rejected');
  }, 3000);
});


const secondPromise = new Promise((resolve) => {
  const clickHandler = (event) => {
    if (event.button === 0 || event.button === 2) {
      document.removeEventListener('click', clickHandler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);
});

const thirdPromise = new Promise((resolve) => {
  const clickHandler = (event) => {
    if (event.button === 0) { // Left click
      leftClickHappened = true;
    }
    if (event.button === 2) { // Right click
      rightClickHappened = true;
    }

    if (leftClickHappened && rightClickHappened) {
      document.removeEventListener('click', clickHandler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);
});

function showNotification(message, isSuccess) {
  const notification = document.createElement('div');
  notification.setAttribute('data-qa', 'notification');
  notification.className = isSuccess ? 'success' : 'error';
  notification.innerText = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

firstPromise
  .then((message) => showNotification(message, true))
  .catch((message) => showNotification(message, false));

secondPromise
  .then((message) => showNotification(message, true))
  .catch((message) => showNotification(message, false));

thirdPromise
  .then((message) => showNotification(message, true))
  .catch((message) => showNotification(message, false));


document.addEventListener('contextmenu', (event) => event.preventDefault());
