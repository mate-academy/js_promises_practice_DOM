'use strict';

function createMessage(type, text) {
  const message = document.createElement('div');

  message.className = type;
  message.dataset.qa = 'notification';
  message.innerText = text;
  document.body.append(message);
}

const clickHandle = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 1 || e.button === 2) {
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const leftOrRightClickHandle = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const leftAndRightClickHandle = new Promise((resolve) => {
  let pressedRight = false;
  let pressedLeft = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      pressedLeft = true;
    }

    if (e.button === 2) {
      pressedRight = true;
    }

    if (pressedRight && pressedLeft) {
      resolve();
    }
  });
});

clickHandle.then(() => {
  createMessage('success', 'First promise was resolved!');
}).catch(() => {
  createMessage('warning', 'First promise was rejected!');
});

leftOrRightClickHandle.then(() => {
  createMessage('success', 'Second promise was resolved!');
});

leftAndRightClickHandle.then(() => {
  createMessage('success', 'Third promise was resolved!');
});
