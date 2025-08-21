'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let done = false;

  const handler = (e) => {
    if (e.button === 0 && !done) {
      done = true;
      resolve('First promise was resolved');
      clearTimeout(timerId);
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);

  const timerId = setTimeout(() => {
    if (!done) {
      done = true;
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
      document.removeEventListener('mousedown', handler);
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
      e.preventDefault();
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

firstPromise
  .then((message) => {
    const resolveMessage = createNotification('success', message);

    document.body.append(resolveMessage);
  })
  .catch((message) => {
    const rejectMessage = createNotification('error', message);

    document.body.append(rejectMessage);
  });

secondPromise
  .then((message) => {
    const resolveMessage = createNotification('success', message);

    document.body.append(resolveMessage);
  })
  .catch();

thirdPromise
  .then((message) => {
    const resolveMessage = createNotification('success', message);

    document.body.append(resolveMessage);
  })
  .catch();

function createNotification(type, message) {
  let notification = document.querySelector('[data-qa="notification"]');

  if (!notification) {
    notification = document.createElement('div');
    notification.setAttribute('data-qa', 'notification');
    document.body.appendChild(notification);
  }

  notification.className = type;
  notification.textContent = message;

  return notification;
}
