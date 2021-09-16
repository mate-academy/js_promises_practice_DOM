'use strict';

function newMessage(messages, classElement) {
  const div = document.createElement('div');

  div.innerHTML = messages;
  div.classList.add(classElement);
  div.setAttribute('data-qa', 'notification');
  document.body.append(div);
}

new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000, 'First promise was rejected');
}).then((message) => newMessage(message, 'success'))
  .catch((message) => newMessage(message, 'warning'));

new Promise((resolve, reject) => {
  document.addEventListener('mousedown', ev => {
    if ((ev.button === 0) || (ev.button === 2)) {
      resolve('Second promise was resolved');
    }
  });
}).then((message) => newMessage(message, 'success'));

new Promise((resolve, reject) => {
  let buttonLeft = false;
  let buttonRight = false;

  document.addEventListener('mouseup', ev => {
    if (ev.button === 0) {
      buttonLeft = true;
    }

    if (ev.button === 2) {
      buttonRight = true;
    }

    if (buttonLeft && buttonRight) {
      resolve('Third promise was resolved');
    }
  });
}).then((message) => newMessage(message, 'success'));
