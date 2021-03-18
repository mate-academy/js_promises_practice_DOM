'use strict';

const body = document.querySelector('body');
const message = document.createElement('div');

message.dataset.qa = 'notification';

const createElement = (type, text) => {
  message.className = type;
  message.textContent = text;
  body.append(message.cloneNode(true));
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    resolve('First promise was resolved');
  });
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise
  .then((result) => {
    createElement('success', result);
  })
  .catch((error) => {
    createElement('warning', error);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    };
  });
});

secondPromise.then((result) => {
  createElement('success', result);
});

const thirdPromise = new Promise((resolve, reject) => {
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
});

thirdPromise.then((result) => {
  createElement('success', result);
});
