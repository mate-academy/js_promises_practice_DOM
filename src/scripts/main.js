'use strict';

const LEFT_BUTTON_ID = 0;
const RIGHT_BUTTON_ID = 2;
const root = document.querySelector('body');

const firstResolver = function(resolve, reject) {
  root.addEventListener('mousedown', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
};
const secondResolver = function(resolve) {
  root.addEventListener('mousedown', (e) => {
    if (e.button === LEFT_BUTTON_ID || e.button === RIGHT_BUTTON_ID) {
      resolve('Second promise was resolved');
    }
  });
};
const thirdResolver = function(resolve) {
  let leftClickHappened = false;
  let rigthClickHappened = false;

  root.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case LEFT_BUTTON_ID:
        leftClickHappened = true;
        break;
      case RIGHT_BUTTON_ID:
        rigthClickHappened = true;
        break;
    }

    if (leftClickHappened && rigthClickHappened) {
      resolve('Third promise was resolved');
    }
  });
};
const firstPromise = new Promise(firstResolver);
const secondPromise = new Promise(secondResolver);
const thirdPromise = new Promise(thirdResolver);

firstPromise
  .then(result => {
    pushNotification(result, 'success');
  })
  .catch(error => {
    pushNotification(error, 'warning');
  });

secondPromise
  .then(result => {
    pushNotification(result, 'success');
  });

thirdPromise
  .then(result => {
    pushNotification(result, 'success');
  });

function pushNotification(text, type) {
  const notification = document.createElement('block');

  notification.dataset.qa = 'notification';
  notification.innerText = text;
  notification.classList.add(type);

  root.append(notification);
};
