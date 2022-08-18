'use strict';

const MOUSE_BUTTONS = {
  0: 'left',
  1: 'wheel',
  2: 'right',
};

const body = document.querySelector('.root');

const promiseOne = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (clickEvent) => {
    const { button } = clickEvent;

    if (MOUSE_BUTTONS[button] === 'left'
        || MOUSE_BUTTONS[button] === 'wheel'
        || MOUSE_BUTTONS[button] === 'right'
    ) {
      resolve();
    }
  });

  setTimeout(() => reject(new Error()), 3000);
});

promiseOne
  .then(() =>
    createNotification('success', 'First promise was resolved'))
  .catch(() =>
    createNotification('warning', 'First promise was rejected'));

const promiseTwo = new Promise((resolve) => {
  body.addEventListener('mousedown', (clickEvent) => {
    const { button } = clickEvent;

    if (MOUSE_BUTTONS[button] === 'left'
        || MOUSE_BUTTONS[button] === 'right') {
      resolve();
    }
  });
});

promiseTwo
  .then(() =>
    createNotification('success', 'Second promise was resolved'));

const promiseThree = new Promise((resolve) => {
  const buttonsClicked = {
    'left': false,
    'right': false,
  };

  body.addEventListener('mousedown', (clickEvent) => {
    const { button } = clickEvent;

    if (MOUSE_BUTTONS[button] === 'left') {
      buttonsClicked.left = true;
    }

    if (MOUSE_BUTTONS[button] === 'right') {
      buttonsClicked.right = true;
    }

    if (buttonsClicked.left && buttonsClicked.right) {
      resolve();
    }
  });
});

promiseThree
  .then(() =>
    createNotification('success', 'Third promise was resolved'));

function createNotification(type, message) {
  const notification = document.createElement('div');

  notification.textContent = message;
  notification.classList.add('notification', type);
  notification.dataset.qa = 'notification';

  body.insertAdjacentElement('beforeend', notification);
}
