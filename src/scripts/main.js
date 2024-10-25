'use strict';

const showMessage = (text, className) => {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.textContent = text;
  message.className = `message ${className}`;
  document.body.appendChild(message);
};

document.addEventListener('contextmenu', (ev) => {
  ev.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  let isSettled = false;

  const clickHandler = () => {
    if (!isSettled) {
      isSettled = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    if (!isSettled) {
      isSettled = true;
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', clickHandler);
    }
  }, 3000);
});

firstPromise
  .then((message) => {
    showMessage(message, 'success');
  })
  .catch((error) => {
    showMessage(error.message, 'error');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', function handler(ev) {
    if (ev.button === 0) {
      resolve('Second promise was resolved on left click');
      document.removeEventListener('mousedown', handler);
    } else if (ev.button === 2) {
      resolve('Second promise was resolved on right click');
      document.removeEventListener('mousedown', handler);
    }
  });
});

secondPromise.then((message) => {
  showMessage(message, 'success');
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  const clickHandler = (ev) => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

thirdPromise.then((message) => {
  showMessage(message, 'success');
});
