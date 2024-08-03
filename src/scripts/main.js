'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  const clickHandler = (newEvent) => {
    if (newEvent.button === 0) {
      clicked = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const clickHandler = (newEvent) => {
    if (newEvent.button === 0 || newEvent.button === 2) {
      newEvent.preventDefault();

      resolve('Second promise was resolved');
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('contextmenu', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  const clickHandler = (newEvent) => {
    if (newEvent.button === 0) {
      leftClick = true;
    }

    if (newEvent.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('contextmenu', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

function displayNotification(message, isSuccess) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = isSuccess ? 'success' : 'error';
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then((message) => {
    displayNotification(message, true);
  })
  .catch((error) => {
    displayNotification(error.message, false);
  });

secondPromise
  .then((message) => {
    displayNotification(message, true);
  })
  .catch((error) => {
    displayNotification(error.message, false);
  });

thirdPromise
  .then((message) => {
    displayNotification(message, true);
  })
  .catch((error) => {
    displayNotification(error.message, false);
  });
