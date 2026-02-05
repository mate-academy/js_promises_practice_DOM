'use strict';

const showNotification = (message, isSuccess = true) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isSuccess ? 'success' : 'error';
  notification.textContent = message;
  document.body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        clearTimeout(timer);
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  const handleAction = () => resolve('Second promise was resolved');

  document.addEventListener('click', handleAction, { once: true });

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      handleAction();
    },
    { once: true },
  );
});

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => resolve(), { once: true });
});

const rightClick = new Promise((resolve) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve();
    },
    { once: true },
  );
});

const thirdPromise = Promise.all([leftClick, rightClick]).then(
  () => 'Third promise was resolved',
);

const handlePromise = (promise) => {
  promise
    .then((msg) => showNotification(msg, true))
    .catch((err) => showNotification(err.message, false));
};

handlePromise(firstPromise);
handlePromise(secondPromise);
handlePromise(thirdPromise);
