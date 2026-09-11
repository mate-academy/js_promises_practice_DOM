'use strict';

function showNotification(message, notificationClass) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(notificationClass);
  notification.textContent = message;

  document.body.append(notification);
}

function showErrorNotification(error) {
  showNotification(error.message, 'error');
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (mouseEvent) => {
    if (mouseEvent.button !== 0) {
      return;
    }

    clearTimeout(timeoutId);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (mouseEvent) => {
    if (mouseEvent.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let wasLeftClicked = false;
  let wasRightClicked = false;

  const resolveAfterBothClicks = () => {
    if (wasLeftClicked && wasRightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', (mouseEvent) => {
    if (mouseEvent.button !== 0) {
      return;
    }

    wasLeftClicked = true;
    resolveAfterBothClicks();
  });

  document.addEventListener('contextmenu', (mouseEvent) => {
    if (mouseEvent.button !== 2) {
      return;
    }

    wasRightClicked = true;
    resolveAfterBothClicks();
  });
});

firstPromise.then(
  (message) => showNotification(message, 'success'),
  showErrorNotification,
);

secondPromise.then(
  (message) => showNotification(message, 'success'),
  showErrorNotification,
);

thirdPromise.then(
  (message) => showNotification(message, 'success'),
  showErrorNotification,
);
