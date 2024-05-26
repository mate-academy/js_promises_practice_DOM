'use strict';

function appendNotification(message, isSuccess = true) {
  const notification = document.createElement('div');
  const notificationTitle = document.createElement('h3');
  const notificationText = document.createElement('p');

  notification.dataset.qa = 'notification';
  notification.classList.add(isSuccess === true ? 'success' : 'error');

  notificationTitle.textContent = isSuccess === true ? 'Success' : 'Error';

  notificationText.textContent = message;

  notification.appendChild(notificationTitle);
  notification.appendChild(notificationText);

  document.body.appendChild(notification);
}

let clickTimeout;
let isSecondPromiseResolved = false;
let isClickEvent = false;
let isContextMenuEvent = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    clearTimeout(clickTimeout);
    resolve('First promise was resolved');
  });

  clickTimeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    isClickEvent = true;
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    isContextMenuEvent = true;
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  const checkBothEvents = setInterval(() => {
    if (isClickEvent && isContextMenuEvent) {
      clearInterval(checkBothEvents);
      resolve('Third promise was resolved');
    }
  }, 100);
});

firstPromise
  .then((result) => {
    appendNotification(result);
  })
  .catch((error) => {
    appendNotification(error.message, false);
  });

secondPromise.then((result) => {
  if (!isSecondPromiseResolved) {
    appendNotification(result);
    isSecondPromiseResolved = true;
  }
});

thirdPromise.then((result) => {
  appendNotification(result);
});
