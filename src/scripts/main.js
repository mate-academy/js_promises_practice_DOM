'use strict';

function printMessage(className, text) {
  const message = document.createElement('div');

  message.className = className;
  message.dataset.qa = 'notification';
  message.innerText = text;

  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', resolve);

  setTimeout(() => {
    reject(new Error('Document was not clicked at'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('mousedown', (currentEvent) => {
    const button = currentEvent.button;

    if (button === 0 || button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let hasLeftClickHappened = false;
  let hasRigthClickHappened = false;

  document.addEventListener('mousedown', (currentEvent) => {
    const button = currentEvent.button;

    if (button === 0) {
      hasLeftClickHappened = true;
    }

    if (button === 2) {
      hasRigthClickHappened = true;
    }

    if (hasLeftClickHappened && hasRigthClickHappened) {
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

thirdPromise
  .then(() => {
    printMessage('success', 'Third promise was resolved');
  });
