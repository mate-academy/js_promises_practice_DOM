'use strict';

let leftClickHappened = false;
let rightClickHappened = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClickHappened = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!leftClickHappened) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClickHappened = true;
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    rightClickHappened = true;
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  const clickHandler = () => {
    document.addEventListener('click', () => {
      leftClickHappened = true;
    });

    document.addEventListener('contextmenu', () => {
      rightClickHappened = true;
    });

    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
    }
  };

  const contextmenuHandler = () => {
    rightClickHappened = true;

    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', contextmenuHandler);
});

function createNotificationDiv(message, type = 'success') {
  const notificationDiv = document.createElement('div');

  notificationDiv.setAttribute('data-qa', 'notification');

  if (type === 'success') {
    notificationDiv.classList.add('success');
  } else {
    notificationDiv.classList.add('error');
  }

  notificationDiv.textContent = message;
  document.body.appendChild(notificationDiv);
}

firstPromise
  .then((message) => createNotificationDiv(message))
  .catch((message) => createNotificationDiv(message, 'error'));
secondPromise.then((message) => createNotificationDiv(message));
thirdPromise.then((message) => createNotificationDiv(message));
