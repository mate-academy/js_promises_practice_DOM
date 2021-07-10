'use strict';

function generateMessage(className, text) {
  const createMessage = document.createElement('div');

  createMessage.className = className;
  createMessage.innerHTML = text;
  createMessage.setAttribute('data-qa', 'notification');
  document.body.appendChild(createMessage);
}

new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
})
  .then((value) => generateMessage('success', value))
  .catch((value) => generateMessage('warning', value));

new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 2 || e.button === 0) {
      resolve('Second promise was resolved');
    }
  });
}).then((value) => generateMessage('success', value));

new Promise((resolve, reject) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftButton = false;
    }

    if (e.button === 2) {
      rightButton = false;
    }
  });
}).then((value) => generateMessage('success', value));
