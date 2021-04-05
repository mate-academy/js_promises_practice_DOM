'use strict';

const body = document.querySelector('body');

function createMessage(classOfMessage, textOfMessage) {
  const message = document.createElement('div');

  message.className = classOfMessage;
  message.dataset.qa = 'notification';
  message.textContent = textOfMessage;

  body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', () => {
    resolve();
  });

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
  let isLeftMouseClick = false;
  let isRightMouseClick = false;

  body.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      isRightMouseClick = true;
    }

    if (mouseEvent.button === 2) {
      isLeftMouseClick = true;
    }

    if (isLeftMouseClick && isRightMouseClick) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => {
    createMessage('success', 'Third promise was resolved');
  });
