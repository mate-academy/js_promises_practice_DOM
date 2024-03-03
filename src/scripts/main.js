/* eslint-disable no-console */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const firstPromise = new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => reject(new Error('First promise was rejected')), 3000);
  });

  const secondPromise = new Promise((resolve) => {
    const onClick = (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    };

    document.addEventListener('mousedown', onClick);
  });

  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    document.addEventListener('mousedown', ({ which }) => {
      if (which === 1) {
        leftClicked = true;

        if (rightClicked) {
          resolve('Third promise was resolved');
        }
      }

      if (which === 3) {
        rightClicked = true;

        if (leftClicked) {
          resolve('Third promise was resolved');
        }
      }
    });
  });

  const addNotification = (type, data) => {
    const notification = `<div data-qa="notification" class="${type}">${data}</div>`;

    document.body.insertAdjacentHTML('afterbegin', notification);
  };

  firstPromise
    .then((data) => addNotification('success', data))
    .catch((error) => addNotification('error', error));

  secondPromise
    .then((data) => addNotification('success', data))
    .catch((error) => addNotification('error', error));

  thirdPromise
    .then((data) => addNotification('success', data))
    .catch((error) => addNotification('error', error));
});
