'use strict';

function showNotification(message, isSuccess) {
  let notification = document.querySelector('[data-qa="notification"]');

  if (!notification) {
    notification = document.createElement('div');
    notification.setAttribute('data-qa', 'notification');
    document.body.appendChild(notification);
  }

  notification.className = isSuccess ? 'success' : 'error';
  notification.textContent = message;
}

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  const clickHandler = () => {
    clicked = true;
    resolve('First promise was resolved');

    document.removeEventListener('click', clickHandler);
    clearTimeout(timer);
  };

  document.addEventListener('click', clickHandler);

  const timer = setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', clickHandler);
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const rightHandler = (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
    document.removeEventListener('contextmenu', rightHandler);
  };

  document.addEventListener('contextmenu', rightHandler);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const check = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');

      document.removeEventListener('click', leftHandler);
      document.removeEventListener('contextmenu', rightHandler);
    }
  };

  const leftHandler = (ev) => {
    leftClicked = true;
    check();
  };

  const rightHandler = (ev) => {
    ev.preventDefault();
    rightClicked = true;
    check();
  };

  document.addEventListener('click', leftHandler);
  document.addEventListener('contextmenu', rightHandler);
});

firstPromise
  .then((message) => showNotification(message, true))
  .catch((message) => showNotification(message, false));

secondPromise
  .then((message) => showNotification(message, true))
  .catch((message) => showNotification(message, false));

thirdPromise
  .then((message) => showNotification(message, true))
  .catch((message) => showNotification(message, false));
