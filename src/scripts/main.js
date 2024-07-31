'use strict';

const body = document.querySelector('body');

const NOTIFICATION_TYPES = {
  success: 'success',
  error: 'error',
};

const listeners = ['click', 'contextmenu'];

const showNotification = (type, text) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = text;

  body.appendChild(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  /* eslint-disable promise/param-names */
  const timerId = setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timerId);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve, _) => {
  /* eslint-disable promise/param-names */
  for (const type of listeners) {
    document.addEventListener(type, (e) => {
      e.preventDefault();

      resolve('Second promise was resolved');
    });
  }
});

const thirdPromise = new Promise((resolve, _) => {
  /* eslint-disable promise/param-names */
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    Promise.all([firstPromise, secondPromise]).then(() => {
      resolve('Third promise was resolved');
    });
  });
});

firstPromise
  .then((response) => {
    showNotification(NOTIFICATION_TYPES.success, response);
  })
  .catch((error) => {
    showNotification(NOTIFICATION_TYPES.error, error);
  });

secondPromise.then((response) => {
  showNotification(NOTIFICATION_TYPES.success, response);
});

thirdPromise.then((response) => {
  showNotification(NOTIFICATION_TYPES.success, response);
});
