'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const firstPromise = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);

    document.addEventListener('mousedown', function handler(evt) {
      if (evt.button === 0) {
        clearTimeout(timer);
        resolve('First promise was resolved');
        document.removeEventListener('mousedown', handler);
      }
    });
  });

  const secondPromise = new Promise((resolve) => {
    document.addEventListener('mousedown', function handler(evt) {
      if (evt.button === 0 || evt.button === 2) {
        resolve('Second promise was resolved');
        document.removeEventListener('mousedown', handler);
      }
    });
  });

  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    document.addEventListener('mousedown', function handler(evt) {
      if (evt.button === 0) {
        leftClicked = true;
      }

      if (evt.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        document.removeEventListener('mousedown', handler);
      }
    });
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
        notification.textContent = err.message;
        document.body.appendChild(notification);
      });
  });
});
