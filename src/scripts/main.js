'use strict';

const body = document.querySelector('body');

function createMessage(className, text) {
  const message = document.createElement('div');

  message.className = className;
  message.dataset.qa = 'notification';
  message.textContent = text;

  body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', resolve);

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise
  .then(() => {
    createMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    createMessage('warning', 'First promise was rejected');
  });

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0 || mouseEvent.button === 2) {
      resolve();
    }
  });
});

secondPromise
  .then(() => {
    createMessage('success', 'Second promise was resolved');
  });

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftButtonClicked = false;
  let isRightButtonClicked = false;

  body.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      isRightButtonClicked = true;
    }

    if (mouseEvent.button === 2) {
      isLeftButtonClicked = true;
    }

    if (isLeftButtonClicked && isRightButtonClicked) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => {
    createMessage('success', 'Third promise was resolved');
  });
