'use strict';

function handleNotification(divMessage, isSuccess) {
  const div = document.createElement('div');

  div.textContent = divMessage;
  div.className = isSuccess ? 'success' : 'error';

  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeout);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');

      leftClicked = false;
      rightClicked = false;
    }
  });
});

firstPromise
  .then((message) => {
    handleNotification(message, true);
  })
  .catch((error) => {
    handleNotification(error, false);
  });

secondPromise
  .then((message) => {
    handleNotification(message, true);
  })
  .catch((error) => {
    handleNotification(error, false);
  });

thirdPromise
  .then((message) => {
    handleNotification(message, true);
  })
  .catch((error) => {
    handleNotification(error, false);
  });
