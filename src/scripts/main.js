'use strict';

let leftClick;
let rightClick;

// eslint-disable-next-line no-unused-vars
function printMessage(messageText, messageClass) {
  const message = document.createElement('div');

  message.className += messageClass;
  message.setAttribute('data-qa', 'notification');
  message.innerText = `${messageText}`;
  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

firstPromise.then((message) => {
  printMessage(message, 'success');
}, (message) => {
  printMessage(message, 'warning');
});

const secondPromise = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('mousedown', event => {
    if (event.button !== 1) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => {
  printMessage(message, 'success');
});

const thirdPromise = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('mousedown', event => {
    switch (event.button) {
      case 0: leftClick = true;
        break;
      case 2: rightClick = true;
        break;
    };

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  printMessage(message, 'success');
});
