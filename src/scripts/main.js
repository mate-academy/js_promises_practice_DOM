'use strict';

const REJECT_DELAY = 3000;

const showNotification = (message, type) => {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = message;

  document.body.append(notification);
};

const onSuccess = (message) => showNotification(message, 'success');
const onError = (error) => showNotification(error.message, 'error');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, REJECT_DELAY);
});

const secondPromise = new Promise((resolve) => {
  const resolveSecond = () => resolve('Second promise was resolved');

  document.addEventListener('click', resolveSecond);
  document.addEventListener('contextmenu', resolveSecond);
});

const thirdPromise = new Promise((resolve) => {
  let hasLeftClick = false;
  let hasRightClick = false;

  const resolveWhenBothHappened = () => {
    if (hasLeftClick && hasRightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    hasLeftClick = true;
    resolveWhenBothHappened();
  });

  document.addEventListener('contextmenu', () => {
    hasRightClick = true;
    resolveWhenBothHappened();
  });
});

firstPromise.then(onSuccess).catch(onError);
secondPromise.then(onSuccess).catch(onError);
thirdPromise.then(onSuccess).catch(onError);
