'use strict';

const body = document.body;

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function appendNotificationOnSuccess(textContent) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add('success');
  notification.textContent = textContent;

  body.append(notification);
}

function appendNotificationOnError(textContent) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add('error');
  notification.textContent = textContent;

  body.append(notification);
}

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftClick = true;

      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick || rightClick) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(appendNotificationOnSuccess).catch(appendNotificationOnError);
secondPromise.then(appendNotificationOnSuccess);
thirdPromise.then(appendNotificationOnSuccess);
