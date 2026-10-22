/* eslint-disable no-unused-vars */
'use strict';

function addingPromiseMessage(message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;

  if (String(message).includes('resolved')) {
    notification.classList.add('success');
  } else {
    notification.classList.add('error');
  }

  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject(`First promise was rejected`);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  // eslint-disable-next-line no-shadow
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    resolve(`Second promise was resolved`);
  });
});

const thirdPromise = new Promise((resolve) => {
  let previousLeftClick = false;
  let previousRightClick = false;

  document.addEventListener('click', () => {
    previousLeftClick = true;

    if (previousRightClick) {
      resolve(`Third promise was resolved`);
    }
  });

  // eslint-disable-next-line no-shadow
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    previousRightClick = true;

    if (previousLeftClick) {
      resolve(`Third promise was resolved`);
    }
  });
});

firstPromise
  .then((message) => {
    addingPromiseMessage(message);
  })
  .catch((message) => {
    addingPromiseMessage(message);
  });

secondPromise
  .then((message) => {
    addingPromiseMessage(message);
  })
  .catch((message) => {
    addingPromiseMessage(message);
  });

thirdPromise
  .then((message) => {
    addingPromiseMessage(message);
  })
  .catch((message) => {
    addingPromiseMessage(message);
  });
