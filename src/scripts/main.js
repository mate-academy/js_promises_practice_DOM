'use strict';

const showNotification = (message, type = 'success') => {
  const notification = document.createElement('div');

  notification.className = type;
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  document.body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('contextmenu', preventDefault);
      resolve('Second promise was resolved');
    }
  };
  const preventDefault = (e) => e.preventDefault();

  document.addEventListener('contextmenu', preventDefault);
  document.addEventListener('mousedown', handler);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkClicks = () => {
    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', clickHandler);
      resolve('Third promise was resolved');
    }
  };

  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }
    checkClicks();
  };

  document.addEventListener('mousedown', clickHandler);
});

const attachHandlers = (promise) => {
  promise
    .then((message) => showNotification(message, 'success'))
    .catch((error) => showNotification(error.message, 'error'));
};

attachHandlers(firstPromise);
attachHandlers(secondPromise);
attachHandlers(thirdPromise);
