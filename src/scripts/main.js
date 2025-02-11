'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const promise1 = new Promise((resolve, reject) => {
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

  const promise2 = new Promise((resolve) => {
    document.addEventListener(
      'mousedown',
      (e) => {
        if (e.button === 0 || e.button === 2) {
          resolve('Second promise was resolved');
        }
      },
      { once: true },
    );
  });

  const promise3 = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    });
  });

  function createNotification(message, type) {
    const div = document.createElement('div');

    div.className = type;
    div.dataset.qa = 'notification';
    div.textContent = message;
    document.body.appendChild(div);
  }

  promise1
    .then((msg) => createNotification(msg, 'success'))
    .catch((err) => createNotification(err.message, 'error'));
  promise2.then((msg) => createNotification(msg, 'success'));
  promise3.then((msg) => createNotification(msg, 'success'));
});
