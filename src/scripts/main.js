'use strict';

const showNotification = (message, className) => {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = className;
  notification.textContent = message;

  document.body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('First promise was resolved on a left click in the document');
    },
    { once: true },
  );

  setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const resolveSecondPromise = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', resolveSecondPromise, { once: true });

  document.addEventListener('contextmenu', resolveSecondPromise, {
    once: true,
  });
});

const thirdPromise = new Promise((resolve) => {
  let wasLeftClick = false;
  let wasRightClick = false;

  const resolveThirdPromise = () => {
    if (wasLeftClick && wasRightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    wasLeftClick = true;
    resolveThirdPromise();
  });

  document.addEventListener('contextmenu', (clickEvent) => {
    clickEvent.preventDefault();

    wasRightClick = true;
    resolveThirdPromise();
  });
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

secondPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

thirdPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));
