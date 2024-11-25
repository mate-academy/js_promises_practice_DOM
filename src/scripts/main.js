'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const resolvedPromise = () => resolve('Second promise was resolved');

  document.addEventListener('click', resolvedPromise);

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolvedPromise();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

const createNotification = (text, className) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('notification', className);
  notification.textContent = text;

  document.body.appendChild(notification);
};

const handleSuccess = (message) => {
  createNotification(message, 'success');
};

const handleError = (message) => {
  createNotification(message, 'error');
};

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);
