'use strict';

function printMessage(message, messageclass) {
  const messageElement = document.createElement('div');

  messageElement.classList.add(messageclass);
  messageElement.setAttribute('data-qa', 'notification');
  messageElement.innerText = message;

  document.body.append(messageElement);
}

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error()), 3000);

  document.addEventListener('mousedown', () => resolve());
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (even) => {
    if (even.button === 0 || even.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  const clickCounter = {
    leftClick: false,
    rightClick: false,
  };

  document.addEventListener('mousedown', (even) => {
    if (even.button === 0) {
      clickCounter.leftClick = true;
    }

    if (even.button === 2) {
      clickCounter.rightClick = true;
    }

    if (clickCounter.leftClick && clickCounter.rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    printMessage('First promise was resolved', 'success');
  })
  .catch(() => {
    printMessage('First promise was rejected', 'warning');
  });

secondPromise.then(() => {
  printMessage('Second promise was resolved', 'success');
});

thirdPromise.then(() => {
  printMessage('Third promise was resolved', 'success');
});
