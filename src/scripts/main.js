'use strict';

function showMessage(message, isError = false) {
  const messageElement = document.createElement('div');

  if (isError) {
    messageElement.classList.add('error');
  } else {
    messageElement.classList.add('success');
  }

  messageElement.setAttribute('data-qa', 'notification');
  messageElement.textContent = message;

  document.body.appendChild(messageElement);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const handler = (eventClick) => {
    if (eventClick.button === 0) {
      document.removeEventListener('mousedown', handler);
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

firstPromise
  .then((message) => {
    showMessage(message);
  })
  .catch((err) => {
    showMessage(err.message, true);
  });

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const secondPromise = new Promise((resolve, reject) => {
  const handler = (eventClick) => {
    if (eventClick.button === 0 || eventClick.button === 2) {
      document.removeEventListener('mousedown', handler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

secondPromise.then((message) => {
  showMessage(message);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  const handler = (eventClick) => {
    if (eventClick.button === 0) {
      leftClicked = true;
    }

    if (eventClick.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', handler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

thirdPromise.then((message) => {
  showMessage(message);
});
