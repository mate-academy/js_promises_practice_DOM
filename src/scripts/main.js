'use strict';

function createMessage(className, text) {
  const message = document.createElement('div');

  message.classList.add(className);
  message.innerHTML = text;
  message.dataset.qa = 'notification';
  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', resolve);

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

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0 || mouseEvent.button === 2) {
      resolve();
    }
  });
});

secondPromise
  .then(() => {
    createMessage('success', 'Second promise was resolved');
  });

const thirdPromise = new Promise((resolve) => {
  let hasPressedLeftButton = false;
  let hasPressedRightButton = false;

  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      hasPressedLeftButton = true;
    }

    if (mouseEvent.button === 2) {
      hasPressedRightButton = true;
    }

    if (hasPressedRightButton && hasPressedLeftButton) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(() => {
    createMessage('success', 'Third promise was resolved');
  });
