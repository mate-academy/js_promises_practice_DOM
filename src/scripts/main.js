'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let isClicked = false;

  document.querySelector('body').addEventListener('click', () => {
    isClicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!isClicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.querySelector('body').addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.querySelector('body').addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  document.querySelector('body').addEventListener('click', () => {
    if (isRightClicked) {
      resolve('Third promise was resolved');
    } else {
      isLeftClicked = true;
    }
  });

  document.querySelector('body').addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    if (isLeftClicked) {
      resolve('Third promise was resolved');
    } else {
      isRightClicked = true;
    }
  });
});

firstPromise
  .then((result) => {
    displayNotification(result, 'success');
  })
  .catch((error) => {
    displayNotification(error, 'warning');
  });

secondPromise
  .then((result) => {
    displayNotification(result, 'success');
  });

thirdPromise
  .then((result) => {
    displayNotification(result, 'success');
  });

function displayNotification(message, className) {
  const messageElement = document.createElement('div');

  messageElement.className = className;
  messageElement.textContent = message;
  document.body.append(messageElement);
}
