'use strict';

const formMessage = (className, text) => {
  const message = document.createElement('div');

  message.className = className;
  message.setAttribute(message.dataset.qa, 'notification');
  message.textContent = text;
  document.body.append(message);
};

const firstPromise = new Promise(function(resolve, reject) {
  document.addEventListener('mousedown', resolve);
  setTimeout(() => reject(new Error()), 3000);
});

firstPromise
  .then(() => {
    formMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    formMessage('warning', 'First promise was rejected');
  });

const secondPromise = new Promise(function(resolve, reject) {
  document.addEventListener('mousedown', (actualEvent) => {
    if (actualEvent.button === 0 || actualEvent.button === 2) {
      return resolve();
    }
  });
});

secondPromise
  .then(() => {
    formMessage('success', 'Second promise was resolved');
  });

const thirdPromise = new Promise(function(resolve, reject) {
  let leftButtonPressed = false;
  let rightButtonPressed = false;

  document.addEventListener('mousedown', (actualEvent) => {
    if (actualEvent.button === 0) {
      leftButtonPressed = true;
    }

    if (actualEvent.button === 2) {
      rightButtonPressed = true;
    }

    if (leftButtonPressed && rightButtonPressed) {
      return resolve();
    }
  });
});

thirdPromise
  .then(() => {
    formMessage('success', 'Third promise was resolved');
  });
