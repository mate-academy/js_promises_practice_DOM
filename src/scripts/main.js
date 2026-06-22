'use strict';

function showNotification(message, className) {
  const notificationContainer = document.createElement('div');

  notificationContainer.setAttribute('data-qa', 'notification');
  notificationContainer.className = className;
  notificationContainer.textContent = message;

  document.body.append(notificationContainer);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  function handleClick() {
    clearTimeout(timeoutId);
    resolve('First promise was resolved');
    document.removeEventListener('click', handleClick);
  }

  document.addEventListener('click', handleClick);
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

const secondPromise = new Promise((resolve) => {
  function resolvePromise() {
    resolve('Second promise was resolved');
  }

  document.addEventListener('click', resolvePromise, { once: true });

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolvePromise();
    },
    { once: true },
  );
});

secondPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function check() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClicked = true;
    check();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;
    check();
  });
});

thirdPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));
