'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  document.addEventListener('click', () => {
    clearTimeout(timeoutId);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  const onClick = () => resolve('Second promise was resolved');

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onClick);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  const resolveIfBothClicked = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;
    resolveIfBothClicked();
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    resolveIfBothClicked();
  });
});

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = type;
  notification.textContent = message;

  document.body.appendChild(notification);
}

firstPromise.then(
  (message) => showNotification(message, 'success'),
  (message) => showNotification(message, 'error'),
);

secondPromise.then(
  (message) => showNotification(message, 'success'),
  (message) => showNotification(message, 'error'),
);

thirdPromise.then(
  (message) => showNotification(message, 'success'),
  (message) => showNotification(message, 'error'),
);
