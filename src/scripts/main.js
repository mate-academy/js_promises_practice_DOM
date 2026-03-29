'use strict';

const showNotification = (message, isError = false) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isError ? 'error' : 'success';
  notification.textContent = message;
  document.body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timeout);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.type === 'contextmenu') {
      e.preventDefault();
    }

    document.removeEventListener('click', handler);
    document.removeEventListener('contextmenu', handler);
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

const leftClicked = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Left done');
    },
    { once: true },
  );
});

const rightClicked = new Promise((resolve) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Right done');
    },
    { once: true },
  );
});

const thirdPromise = Promise.all([leftClicked, rightClicked]).then(() => {
  return 'Third promise was resolved';
});

const success = (msg) => showNotification(msg);
const error = (err) => showNotification(err.message, true);

firstPromise.then(success, error);
secondPromise.then(success, error);
thirdPromise.then(success, error);
