'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      cleanup();
    }
  };
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    cleanup();
  }, 3000);

  function cleanup() {
    clearTimeout(timerId);
    document.removeEventListener('mousedown', clickHandler);
  }

  document.addEventListener('mousedown', clickHandler);
});

firstPromise
  .then((message) => showNotification(message, false))
  .catch((error) => showNotification(error, true));

function showNotification(message, isError) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;

  if (isError) {
    notification.classList.add('error');
  }

  if (!isError) {
    notification.classList.add('success');
  }

  document.body.append(notification);
}

const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      cleanup();
    }
  };

  function cleanup() {
    document.removeEventListener('mousedown', clickHandler);
  }

  document.addEventListener('mousedown', clickHandler);
});

secondPromise
  .then((message) => showNotification(message, false))
  .catch((error) => showNotification(error, true));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      cleanup();
    }
  };

  function cleanup() {
    document.removeEventListener('mousedown', clickHandler);
  }

  document.addEventListener('mousedown', clickHandler);
});

thirdPromise
  .then((message) => showNotification(message, false))
  .catch((error) => showNotification(error, true));
