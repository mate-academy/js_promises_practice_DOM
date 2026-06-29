'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const firstPromise = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }, 3000);

    document.addEventListener('click', function handler() {
      clearTimeout(timer);
      resolve('First promise was resolved');
      document.removeEventListener('click', handler);
    });
  });

  const secondPromise = new Promise((resolve) => {
    function handler() {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    }

    document.addEventListener('click', handler);
    document.addEventListener('contextmenu', handler);
  });

  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    function checkResolved() {
      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        document.removeEventListener('click', leftHandler);
        document.removeEventListener('contextmenu', rightHandler);
      }
    }

    function leftHandler() {
      leftClicked = true;
      checkResolved();
    }

    function rightHandler() {
      rightClicked = true;
      checkResolved();
    }

    document.addEventListener('click', leftHandler);
    document.addEventListener('contextmenu', rightHandler);
  });

  [firstPromise, secondPromise, thirdPromise].forEach((promise) => {
    promise
      .then((message) => {
        const notification = document.createElement('div');

        notification.setAttribute('data-qa', 'notification');
        notification.classList.add('success');
        notification.textContent = message;
        document.body.appendChild(notification);
      })
      .catch((err) => {
        const notification = document.createElement('div');

        notification.setAttribute('data-qa', 'notification');
        notification.classList.add('error');
        notification.textContent = err;
        document.body.appendChild(notification);
      });
  });
});
