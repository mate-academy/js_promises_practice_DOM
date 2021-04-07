'use strict';

function addMessage(text, style) {
  const message = document.createElement('div');

  message.classList = style;
  message.innerText = text;
  message.setAttribute('data-qa', 'notification');
  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (
      mouseEvent.button === 0
      || mouseEvent.button === 1
      || mouseEvent.button === 2
    ) {
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error('error: You haven`t pressed any mouse button'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0 || mouseEvent.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise(resolve => {
  let isLeftClicked = false;
  let isRightClicked = false;

  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      isLeftClicked = true;
    }

    if (mouseEvent.button === 2) {
      isRightClicked = true;
    }

    if (isLeftClicked && isRightClicked) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    addMessage(`First promise was resolved`, 'success');
  })
  .catch(() => {
    addMessage(`First promise was rejected`, 'warning');
  });

secondPromise
  .then(() => {
    addMessage(`Second promise was resolved`, 'success');
  });

thirdPromise
  .then(() => {
    addMessage('Third promise was resolved', 'success');
  });
