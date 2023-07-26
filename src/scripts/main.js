'use strict';

const firstPromise = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('mousedown', event => {
    if (event.button !== 0) {
      return;
    }

    resolve('First promise was resolved');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
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

  // eslint-disable-next-line no-shadow
  document.addEventListener('mousedown', event => {
    if (event.button !== 0 && event.button !== 2) {
      return;
    }

    leftClicked = event.button === 0 || leftClicked;
    rightClicked = event.button === 2 || rightClicked;

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

firstPromise
  .then((value) => {
    showNotification(value, 'success');
  })
  .catch((value) => {
    showNotification(value, 'error');
  });

secondPromise
  .then((value) => {
    showNotification(value, 'success');
  })
  .catch((value) => {
    showNotification(value, 'error');
  });

thirdPromise
  .then((value) => {
    showNotification(value, 'success');
  })
  .catch((value) => {
    showNotification(value, 'error');
  });
