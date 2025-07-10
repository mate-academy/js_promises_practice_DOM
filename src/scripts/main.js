'use strict';

async function showNotification(message, isError) {
  const div = document.createElement('div');

  div.className = isError ? 'error' : 'success';
  div.dataset.qa = 'notification';
  div.textContent = message;
  document.body.append(div);
}

// eslint-disable-next-line no-undef
const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  // eslint-disable-next-line no-shadow
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      clearTimeout(timeout);
      // eslint-disable-next-line no-unused-expressions
      resolve('First promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    showNotification(message, false);
  })
  .catch((message) => {
    showNotification(message, true);
  });

const secondPromise = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0 || event.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => {
  showNotification(message, false);
});

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  const onMouseDown = (event) => {
    if (event.button === 0) {
      leftClicked = true;
    }

    if (event.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

thirdPromise.then((message) => showNotification(message, false));
