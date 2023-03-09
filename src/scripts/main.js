'use strict';

function addMessage(className, text) {
  const message = document.createElement('div');

  message.classList.add(className);
  message.textContent = text;

  document.body.append(message);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      isLeftClicked = true;
    }

    if (e.button === 2) {
      isRightClicked = true;
    }

    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => addMessage('success', result))
  .catch(result => addMessage('warning', result));

secondPromise
  .then(result => addMessage('success', result));

thirdPromise
  .then(result => addMessage('success', result));
