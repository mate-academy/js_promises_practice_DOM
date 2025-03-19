'use strict';

let leftClicked = false;
let rightClicked = false;

function createNotification(type, message) {
  const notification = document.createElement('div');

  notification.textContent = message;
  notification.classList.add(type);
  notification.dataset.qa = 'notification';
  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutID = setTimeout(
    // eslint-disable-next-line prefer-promise-reject-errors
    () => reject('First promise was rejected'),
    3000,
  );

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timeoutID);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => resolve('Second promise was resolved'),
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(createNotification.bind(null, 'success'))
  .catch(createNotification.bind(null, 'error'));
secondPromise.then(createNotification.bind(null, 'success'));
thirdPromise.then(createNotification.bind(null, 'success'));
