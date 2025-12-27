'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    cleanup();
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', onClick);

  function onClick() {
    cleanup();
    resolve('First promise was resolved');
  }

  function cleanup() {
    clearTimeout(timerId);
    document.removeEventListener('click', onClick);
  }
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onContextMenu);

  function onClick() {
    cleanup();
    resolve('Second promise was resolved');
  }

  function onContextMenu(e) {
    cleanup();
    e.preventDefault();
    resolve('Second promise was resolved');
  }

  function cleanup() {
    document.removeEventListener('click', onClick);
    document.removeEventListener('contextmenu', onContextMenu);
  }
});

const thirdPromise = new Promise((resolve) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  document.addEventListener('click', onClick);

  document.addEventListener('contextmenu', onContextMenu);

  function onClick() {
    if (isRightClicked) {
      cleanup();
      resolve('Third promise was resolved');
    } else {
      isLeftClicked = true;
    }
  }

  function onContextMenu(e) {
    e.preventDefault();

    if (isLeftClicked) {
      cleanup();
      resolve('Third promise was resolved');
    } else {
      isRightClicked = true;
    }
  }

  function cleanup() {
    document.removeEventListener('click', onClick);
    document.removeEventListener('contextmenu', onContextMenu);
  }
});

firstPromise
  .then((message) => showNotification('success', message))
  .catch((error) => showNotification('error', error.message));

secondPromise.then((message) => showNotification('success', message));
thirdPromise.then((message) => showNotification('success', message));

function showNotification(type, message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = type;
  notification.textContent = message;

  document.body.append(notification);
}
