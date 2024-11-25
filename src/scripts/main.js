/* eslint-disable prefer-promise-reject-errors */
'use strict';

const firstPromise = () =>
  new Promise((resolve, reject) => {
    const firstHandleClick = () => {
      resolve('First promise was resolved');
    };

    document.addEventListener('click', firstHandleClick);

    setTimeout(() => {
      document.removeEventListener('click', firstHandleClick);
      reject('First promise was rejected');
    }, 3000);
  });

const secondPromise = () =>
  new Promise((resolve, reject) => {
    const leftClickCallback = (e) => {
      document.removeEventListener('click', leftClickCallback);
      resolve('Second promise was resolved');
    };

    const rightClickCallback = (e) => {
      e.preventDefault();
      document.removeEventListener('click', rightClickCallback);
      resolve('Second promise was resolved');
    };

    document.addEventListener('click', leftClickCallback);
    document.addEventListener('contextmenu', rightClickCallback);
  });

const handleClick = () =>
  new Promise((resolve, reject) => {
    document.addEventListener('click', function leftClickHandler(e) {
      if (e.button === 0) {
        document.removeEventListener('click', leftClickHandler);
        resolve('left');
      }
    });
  });

const handleRightClick = () =>
  new Promise((resolve, reject) => {
    document.addEventListener('contextmenu', function rightClickHandler(e) {
      e.preventDefault();

      document.removeEventListener('click', rightClickHandler);
      resolve('right');
    });
  });

const thirdPromise = () =>
  new Promise((resolve, reject) => {
    const leftClickPromise = handleClick();
    const rightClickPromise = handleRightClick();

    Promise.all([leftClickPromise, rightClickPromise]).then(() => {
      resolve('Third promise was resolved');
    });
  });

const createNotification = (message, notificationStatus) => {
  const body = document.querySelector('body');
  const notification = document.createElement('div');
  const p = document.createElement('p');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(notificationStatus);
  p.textContent = message;
  notification.appendChild(p);
  body.appendChild(notification);
};

firstPromise()
  .then((message) => createNotification(message, 'success'))
  .catch((message) => createNotification(message, 'error'));
secondPromise().then((message) => createNotification(message, 'success'));
thirdPromise().then((message) => createNotification(message, 'success'));
