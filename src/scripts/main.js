'use strict';

const notification =
  document.querySelector('div[data-qa="notification"]') ||
  (() => {
    const el = document.createElement('div');

    el.setAttribute('data-qa', 'notification');
    document.body.appendChild(el);

    return el;
  })();

const showNotification = (message, type) => {
  notification.className = '';
  notification.classList.add(type);
  notification.textContent = message;
};

const firstPromise = new Promise((resolve, reject) => {
  let settled = false;

  const handler = (e) => {
    if (e.button === 0 && !settled) {
      settled = true;
      document.removeEventListener('mousedown', handler);
      clearTimeout(timerId);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);

  const timerId = setTimeout(() => {
    if (!settled) {
      settled = true;
      document.removeEventListener('mousedown', handler);
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  let settled = false;
  const handler = (e) => {
    if (!settled && (e.button === 0 || e.button === 2)) {
      settled = true;
      document.removeEventListener('mousedown', handler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

const thirdPromise = new Promise((resolve) => {
  let clickedLeft = false;
  let clickedRight = false;

  const handler = (e) => {
    if (e.button === 0) {
      clickedLeft = true;
    }

    if (e.button === 2) {
      clickedRight = true;
    }

    if (clickedLeft && clickedRight) {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('contextmenu', preventMenu);
      resolve('Third promise was resolved');
    }
  };

  const preventMenu = (e) => e.preventDefault();

  document.addEventListener('mousedown', handler);
  document.addEventListener('contextmenu', preventMenu);
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((msg) => showNotification(msg, 'error'));

secondPromise.then((msg) => showNotification(msg, 'success'));

thirdPromise.then((msg) => showNotification(msg, 'success'));
