'use strict';

const body = document.querySelector('body');

function createMessage(messageText, type) {
  const msg = document.createElement('div');

  msg.setAttribute('data-qa', 'notification');
  msg.className = type;
  msg.textContent = messageText;
  body.append(msg);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise
  .then(() => createMessage('First promise was resolved!', 'success'))
  .catch(() => createMessage('First promise was rejected!', 'error'));

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 && !(e.button === 2)) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

secondPromise.then(() => {
  createMessage('Second promise was resolved!', 'success');
});

let leftButtonPressed = false;
let rightButtonPressed = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButtonPressed = true;
    }

    if (e.button === 2) {
      rightButtonPressed = true;
    }

    if (leftButtonPressed && rightButtonPressed) {
      resolve();
    }
  });
});

thirdPromise.then(() => {
  createMessage('Third promise was resolved!', 'success');
});
