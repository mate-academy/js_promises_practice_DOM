'use strict';

const MOUSE_BUTTONS = {
  0: 'left',
  2: 'right',
};

const body = document.querySelector('.root');

const promiseOne = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (clickEvent) => {
    const { button } = clickEvent;

    if (MOUSE_BUTTONS[button] === 'left') {
      resolve();
    }
  });

  setTimeout(() => reject(new Error()), 3000);
});

const promiseTwo = new Promise((resolve) => {
  body.addEventListener('mousedown', (clickEvent) => {
    const { button } = clickEvent;

    if (MOUSE_BUTTONS[button] === 'left'
        || MOUSE_BUTTONS[button] === 'right') {
      resolve();
    }
  });
});

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

promiseOne
  .then(() => createNotification('success', 'First promise was resolved'))
  .catch(() => createNotification('warning', 'First promise was rejected'));

promiseTwo
  .then(() => createNotification('success', 'Second promise was resolved'));

promiseThree
  .then(() => createNotification('success', 'Third promise was resolved'));

function createNotification(type, message) {
  body.insertAdjacentHTML('beforeend', `
    <div
      class = "notification ${type}"
      data-qa = "notification"
    >
      ${message}
    </div>
  `);
}
