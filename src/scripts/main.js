/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-shadow */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', event => {
    if (event.button !== 0) {
      return;
    }

    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', event => {
    if (event.button !== 0 && event.button !== 2) {
      return;
    }

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', event => {
    if (event.button !== 0 && event.button !== 2) {
      return;
    }

    leftClicked = event.which === 1 || leftClicked;
    rightClicked = event.which === 3 || rightClicked;

    if (!leftClicked || !rightClicked) {
      return;
    }

    resolve('Third promise was resolved');
  });
});

const showNotification = (message, className) => {
  const lastNotification = document
    .querySelector('.notification:last-of-type');
  const posTop = lastNotification
    ? lastNotification.getBoundingClientRect().height
      + lastNotification.getBoundingClientRect().top + 10
    : 10;

  document.body.insertAdjacentHTML('beforeend', `
    <div
      class="notification ${className}"
      data-qa="notification"
      style="
        top: ${posTop}px;
        right: 10px;
      "
    >
      <p>${message}</p>
    </div>
  `);
};

const onSuccess = (message) => showNotification(message, 'success');

const onError = (message) => showNotification(message, 'warning');

firstPromise.then(onSuccess, onError);
secondPromise.then(onSuccess, onError);
thirdPromise.then(onSuccess, onError);
