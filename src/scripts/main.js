'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');

  function renderNotification(message, className = 'success') {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = className;
    div.textContent = message;
    document.body.append(div);
  }

  const firstPromise = new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);

    logo.addEventListener(
      'click',
      () => {
        clearTimeout(timerId);
        resolve('First promise was resolved click document');
      },
      { once: true }
    );
  });

  const secondPromise = new Promise((resolve) => {
    logo.addEventListener(
      'mousedown',
      (e) => {
        if (e.button === 2) {
          resolve('Second promise was resolved');
        }
      },
      { once: true },
    );
  });

  const thirdPromise = new Promise((resolve) => {
    Promise.all([firstPromise, secondPromise]).then(() => {
      resolve('Third promise was resolved leftright');
    });
  });

  firstPromise
    .then((message) => renderNotification(message))
    .catch((errors) => renderNotification(errors.message, 'error'));

  secondPromise.then((message) => renderNotification(message));
  thirdPromise.then((message) => renderNotification(message));
});
