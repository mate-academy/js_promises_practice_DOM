'use strict';

function createMessage(className, text) {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.className = className;
  message.textContent = text;

  document.body.append(message);
}

const handleClick = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const handleLeftOrRightClick = new Promise((resolve) => {
  document.addEventListener('mousedown', (clickEvent) => {
    const buttonNumber = clickEvent.button;

    if (buttonNumber === 0 || buttonNumber === 2) {
      resolve();
    }
  });
});

const handleLeftAndRightClick = new Promise((resolve) => {
  let isRightClick = false;
  let isLeftClick = false;

  document.addEventListener('mousedown', (clickEvent) => {
    const mouseClick = clickEvent.button;

    if (mouseClick === 0) {
      isLeftClick = true;
    }

    if (mouseClick === 2) {
      isRightClick = true;
    }

    if (isRightClick && isLeftClick) {
      resolve();
    }
  });
});

handleClick
  .then(() => {
    createMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    createMessage('warning', 'First promise was resolved');
  });

handleLeftOrRightClick
  .then(() => {
    createMessage('success', 'Second promise was resolved');
  });

handleLeftAndRightClick
  .then(() => {
    createMessage('success', 'Third promise was resolved');
  });
