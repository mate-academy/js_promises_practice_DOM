'use strict';

function notify(success, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = success;
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      document.removeEventListener('mousedown', onClick);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', onClick);

  setTimeout(() => {
    document.removeEventListener('mousedown', onClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((msg) => notify('success', msg))
  .catch((msg) => notify('error', msg));

const secondPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', onClick);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', onClick);
});

secondPromise.then((msg) => notify('success', msg));

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
      document.removeEventListener('mousedown', onClick);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', onClick);
});

thirdPromise.then((msg) => notify('success', msg));
