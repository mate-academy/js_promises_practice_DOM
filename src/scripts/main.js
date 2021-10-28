'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button < 3) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    };
  });
});

function createMessage(statusMsg, text) {
  const message = document.createElement('div');

  message.className = `${statusMsg}`;
  message.innerText = text;
  message.dataset.qa = 'notification';
  body.append(message);
};

firstPromise
  .then((msg) => createMessage('success', msg))
  .catch((error) => createMessage('warning', error));

secondPromise
  .then((msg) => createMessage('success', msg));

thirdPromise
  .then((msg) => createMessage('success', msg));
