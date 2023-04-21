'use strict';

const newMessage = function(message, addClass) {
  const body = document.querySelector('body');
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.className = addClass;
  element.innerText = message;
  body.append(element);
};

new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
}).then((message) => newMessage(message, 'success'))
  .catch((message) => newMessage(message, 'warning'));

new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
}).then((message) => newMessage(message, 'success'));

let wasRightClick = false;
let wasLeftClick = false;

new Promise((resolve) => {
  document.addEventListener('mousedown', evt => {
    if (evt.button === 0) {
      wasLeftClick = true;
    }

    if (evt.button === 2) {
      wasRightClick = true;
    }

    wasLeftClick && wasRightClick && resolve('Third promise was resolved');
  });
}).then((message) => {
  newMessage(message, 'success');
});
