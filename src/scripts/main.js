'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('First promise was resolved');
    },
    { once: true },
  );

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  ['click', 'contextmenu'].forEach((e) => {
    document.addEventListener(
      e,
      () => {
        resolve('Second promise was resolved');
      },
      { once: true },
    );
  });
});

let clickEvent = false;
let contextMenuEvent = false;

const thirdPromise = new Promise((resolve) => {
  const handleClick = () => {
    clickEvent = true;

    if (clickEvent && contextMenuEvent) {
      resolve('Third promise was resolved');
    }

    document.removeEventListener('click', handleClick);
  };

  const handleContextMenuEvent = () => {
    contextMenuEvent = true;

    if (clickEvent && contextMenuEvent) {
      resolve('Third promise was resolved');
    }

    document.removeEventListener('contextmenu', handleContextMenuEvent);
  };

  document.addEventListener('click', handleClick);

  document.addEventListener('contextmenu', handleContextMenuEvent);
});

const createNotification = (message, hasSuccess) => {
  const notification = document.createElement('div');

  notification.classList.add(hasSuccess ? 'success' : 'error');
  notification.setAttribute('data-qa', 'notification');
  notification.innerHTML = message;

  document.body.append(notification);
};

firstPromise
  .then((message) => createNotification(message, true))
  .catch((message) => createNotification(message, false));

secondPromise.then((message) => createNotification(message, true));
thirdPromise.then((message) => createNotification(message, true));
