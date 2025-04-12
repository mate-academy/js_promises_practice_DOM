'use strict';

function handleMessage(className, text) {
  const message = document.createElement('div');

  message.classList = className;
  message.setAttribute('data-qa', 'notification');
  message.textContent = text;
  document.body.appendChild(message);
}

let isLeftClickPending = true;
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 && isLeftClickPending) {
      isLeftClickPending = false;
      resolve();
    }

    isLeftClickPending = false;
  });

  setTimeout(() => {
    if (isLeftClickPending) {
      isLeftClickPending = false;
      // eslint-disable-next-line prefer-promise-reject-errors
      reject();
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      resolve();
    }
  });

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });
});

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    handleMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    handleMessage('error', 'First promise was rejected');
  });

secondPromise.then(() => {
  handleMessage('success', 'Second promise was resolved');
});

thirdPromise.then(() => {
  handleMessage('success', 'Third promise was resolved');
});
