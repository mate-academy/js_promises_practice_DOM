'use strict';

function printMessage(type, text) {
  const message = document.createElement('div');

  message.classList.add(type);
  message.dataset.qa = 'notification';
  message.textContent = text;

  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => reject(new Error()), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const thirdPromsie = new Promise((resolve, reject) => {
  let leftButtonDown = false;
  let rightButtonDown = false;

  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftButtonDown = true;
        break;

      case 2:
        rightButtonDown = true;
        break;
    }

    if (leftButtonDown && rightButtonDown) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    printMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    printMessage('warning', 'First promise was rejected');
  });

secondPromise
  .then(() => {
    printMessage('success', 'Second promise was resolved');
  });

thirdPromsie
  .then(() => {
    printMessage('success', 'Third promise was resolved');
  });
