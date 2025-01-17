'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function createMessageElement(className) {
  const messageElement = document.createElement('div');

  messageElement.setAttribute('data-qa', 'notification');

  messageElement.className = className;

  return messageElement;
}

function promiseResult(promise) {
  promise
    .then((text) => {
      const message = createMessageElement('success');

      message.textContent = text;
      document.body.appendChild(message);
    })
    .catch((error) => {
      const message = createMessageElement('error');

      message.textContent = error.message;
      document.body.appendChild(message);
    });
}

promiseResult(firstPromise);
promiseResult(secondPromise);
promiseResult(thirdPromise);
