'use strict';

function createNotification(type, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = type;
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      clearTimeout(timer);
      document.removeEventListener('mousedown', onClick);
    }
  };

  document.addEventListener('mousedown', onClick);

  const timer = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
    document.removeEventListener('mousedown', onClick);
  }, 3000);
});

firstPromise
  .then((msg) => createNotification('success', msg))
  .catch((msg) => createNotification('error', msg));

const secondPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', onClick);
    }
  };

  document.addEventListener('mousedown', onClick);
});

secondPromise.then((msg) => createNotification('success', msg));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const onClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', onClick);
    }
  };

  document.addEventListener('mousedown', onClick);
});

thirdPromise.then((msg) => createNotification('success', msg));

document.addEventListener('contextmenu', (e) => e.preventDefault());
