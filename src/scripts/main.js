'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let clickLeft = false;
  let clickRight = false;

  const showNotification = (message, isSuccess) => {
    const notification = document.createElement('div');

    notification.classList.add('message');
    notification.textContent = message;
    notification.setAttribute('data-qa', 'notification');

    if (isSuccess) {
      notification.classList.add('success');
    } else {
      notification.classList.add('error');
    }

    document.body.appendChild(notification);
  };

  const firstPromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(
      // eslint-disable-next-line prefer-promise-reject-errors
      () => reject('First promise was rejected'),
      3000,
    );

    document.addEventListener(
      'click',
      (ev) => {
        if (ev.button === 0) {
          clearTimeout(timeout);
          resolve('First promise was resolved');
        }
      },
      { once: true },
    );
  });

  const secondPromise = new Promise((resolve) => {
    document.addEventListener(
      'click',
      (ev) => {
        if (ev.button === 0 || ev.button === 2) {
          resolve('Second promise was resolved');
        }
      },
      { once: true },
    );
  });

  const thirdPromise = new Promise((resolve) => {
    const checkLeftClick = () => {
      clickLeft = true;
      checkBothClick();
    };

    const checkRightClick = (ev) => {
      ev.preventDefault();
      clickRight = true;
      checkBothClick();
    };

    const checkBothClick = () => {
      if (clickLeft && clickRight) {
        resolve('Third promise was resolved');
        document.removeEventListener('click', checkLeftClick);
        document.removeEventListener('contextmenu', checkRightClick);
      }
    };

    document.addEventListener('click', checkLeftClick);
    document.addEventListener('contextmenu', checkRightClick);
  });

  firstPromise.then((message) => showNotification(message, true));
  firstPromise.catch((message) => showNotification(message, false));

  secondPromise.then((message) => showNotification(message, true));

  thirdPromise.then((message) => showNotification(message, true));

  document.addEventListener('contextmenu', (ev) => ev.preventDefault());
});
