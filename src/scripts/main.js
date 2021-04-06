'use strict';

const printMessage = (className, text) => {
  const message = document.createElement('div');

  message.innerText = text;
  message.dataset.qa = 'notification';
  message.classList.add(className);
  document.body.append(message);
};

const promiseFirst = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const promiseSecond = new Promise(resolve => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0 || mouseEvent.button === 2) {
      resolve();
    }
  });
});

const promiseThird = new Promise(resolve => {
  let isLeftButtonPressed = false;
  let isRightButtonPressed = false;

  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      isLeftButtonPressed = true;
    }

    if (mouseEvent.button === 2) {
      isRightButtonPressed = true;
    }

    if (isLeftButtonPressed && isRightButtonPressed) {
      resolve();
    }
  });
});

promiseFirst
  .then(() => {
    printMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    printMessage('warning', 'First promise was rejected');
  });

promiseSecond
  .then(() => {
    printMessage('success', 'Second promise was resolved');
  });

promiseThird
  .then(() => {
    printMessage('success', 'Third promise was resolved');
  });
