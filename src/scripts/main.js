'use strict';

const body = document.querySelector('body');

function createMessage(text, className) {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.classList.add(className);
  message.textContent = text;
  body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise
  .then(() => {
    createMessage('First promise was resolved', 'success');
  })
  .catch(() => {
    createMessage('First promise was rejected', 'warning');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve();
    }
  });
});

secondPromise
  .then(() => {
    createMessage('Second promise was resolved', 'success');
  });

let leftClick;
let rightClick;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;
      case 2:
        rightClick = true;
        break;
    };

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => {
    createMessage('Third promise was resolved', 'success');
  });
