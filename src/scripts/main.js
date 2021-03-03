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
const createThirdPromise = function(buttonType) {
  return new Promise(resolve => {
    root.addEventListener('mousedown', (e) => {
      if (e.button === buttonType) {
        resolve('Third promise was resolved');
      }
    });
  });
};
const firstPromise = new Promise(firstResolver);
const secondPromise = new Promise(secondResolver);
const thirdPromise1 = createThirdPromise(LEFT_BUTTON_ID);
const thirdPromise2 = createThirdPromise(RIGHT_BUTTON_ID);

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

Promise.all([thirdPromise1, thirdPromise2])
  .then(result => {
    pushNotification(result[0], 'success');
  });

function pushNotification(text, type) {
  const notification = document.createElement('block');

  notification.dataset.qa = 'notification';
  notification.innerText = text;
  notification.classList.add(type);

  root.append(notification);
};
