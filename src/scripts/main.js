'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject('First promise was rejected'), 3000);
});

const secondPrimise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.buttons !== 4) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.buttons === 1) {
      leftClick = true;
    }

    if (e.buttons === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function createMessage(statusMsg, text) {
  const message = document.createElement('div');
  const rootElement = document.querySelector('body');

  message.classList.add(`${statusMsg}`);
  message.innerText = text;
  message.dataset.qa = 'notification';
  rootElement.append(message);
};

firstPromise
  .then((msg) => createMessage('success', msg))
  .catch((msg) => createMessage('warning', msg));

secondPrimise
  .then((msg) => createMessage('success', msg));

thirdPromise
  .then((msg) => createMessage('success', msg));
