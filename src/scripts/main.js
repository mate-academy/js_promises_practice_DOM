'use strict';

function showNotification(message, type = 'success') {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('notification', type);
  div.textContent = message;
  document.body.appendChild(div);
}

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved on a left click in the document');
      document.removeEventListener('click', clickHandler);
      clearTimeout(timeout);
    }
  };
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
    document.removeEventListener('click', clickHandler);
  }, 3000);

  document.addEventListener('click', clickHandler);
});

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

const thirdPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handler);
      leftClicked = false;
      rightClicked = false;
    }
  };

  document.addEventListener('mousedown', handler);
});

firstPromise
  .then((msg) => {
    showNotification(msg, 'success');
  })
  .catch((err) => {
    showNotification(err.message, 'error');
  });

secondPromise.then((msg) => {
  showNotification(msg, 'success');
});

thirdPromise.then((msg) => {
  showNotification(msg, 'success');
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
