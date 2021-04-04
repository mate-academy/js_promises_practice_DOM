'use strict';

function createMessage(className, propmiseNumber) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.className = className;

  message.textContent = className === 'success'
    ? `${propmiseNumber} promise was resolved`
    : `${propmiseNumber} promise was rejected`;
  document.body.append(message);
}

const handleClick = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (clickEvent) => {
    const buttonNumber = clickEvent.button;

    if (buttonNumber >= 0 && buttonNumber < 3) {
      resolve();
    }
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

  document.addEventListener('contextmenu', (clickEvent) => {
    clickEvent.preventDefault();
  });
});

const handleLeftAndRightClick = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('mousedown', (clickEvent) => {
    const mouseClick = clickEvent.button;

    if (mouseClick === 0) {
      leftClick = true;
    }

    if (mouseClick === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve();
    }
  });
});

handleClick
  .then(() => {
    createMessage('success', 'First');
  })
  .catch(() => {
    createMessage('warning', 'First');
  });

handleLeftOrRightClick
  .then(() => {
    createMessage('success', 'Second');
  });

handleLeftAndRightClick
  .then(() => {
    createMessage('success', 'Third');
  });
