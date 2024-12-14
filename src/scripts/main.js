/* eslint-disable no-console */
/* eslint-disable no-shadow */
'use strict';

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = isError ? 'error' : 'success';
  div.textContent = message;
  document.body.appendChild(div);
}

const promise1 = new Promise((resolve, reject) => {
  let clicked = false;

  function onLeftClick(event) {
    if (event.button === 0) {
      clicked = true;
      resolve('First promise was resolved on a left click');
      document.removeEventListener('mousedown', onLeftClick);
    }
  }

  document.addEventListener('mousedown', onLeftClick);

  setTimeout(() => {
    if (!clicked) {
      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
        document.removeEventListener('mousedown', onLeftClick),
      );
    }
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  function onClick(event) {
    if (event.button === 0 || event.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', onClick);
    }
  }
  document.addEventListener('mousedown', onClick);
});

let leftClick = false;
let rightClick = false;

const promise3 = new Promise((resolve) => {
  function onAnyClick(event) {
    if (event.button === 0) {
      leftClick = true;
    } else if (event.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(
        // eslint-disable-next-line max-len
        'Third promise was resolved only after both left and right clicks happened',
      );
      document.removeEventListener('mousedown', onAnyClick);
    }
  }
  document.addEventListener('mousedown', onAnyClick);
});

promise1
  .then((message) => {
    showNotification(message, false);
    console.log(message);
  })
  .catch((error) => {
    showNotification(error, true);
    console.error(error);
  });

promise2
  .then((message) => {
    showNotification(message, false);
    console.log(message);
  })
  .catch((error) => {
    showNotification(error, true);
    console.error(error);
  });

promise3
  .then((message) => {
    showNotification(message, false);
    console.log(message);
  })
  .catch((error) => {
    showNotification(error, true);
    console.error(error);
  });
