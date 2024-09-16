'use strict';

const body = document.querySelector('body');

body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function createMessage(addText, addClass) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add(addClass);
  message.textContent = addText;
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

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve();
    }
  });
});

let leftButtonDown;
let rightButtonDown;

const thirdPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
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
    createMessage('First promise was resolved', 'success');
  })
  .catch(() => {
    createMessage('First promise was rejected', 'warning');
  });

secondPromise
  .then(() => {
    createMessage('Second promise was resolved', 'success');
  });

thirdPromise
  .then(() => {
    createMessage('Third promise was resolved', 'success');
  });
