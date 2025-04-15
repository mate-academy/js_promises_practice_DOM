'use strict';

let leftClicked = false;
let rightClicked = false;

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.className = isError ? 'error' : 'success';
  div.dataset.qa = 'notification';
  document.body.appendChild(div);
  div.textContent = message;
}

const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      document.removeEventListener('click', clickHandler);
      resolve('First promise was resolved on a left click in the document');
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    document.removeEventListener('click', clickHandler);
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('click', clickHandler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);
});

const thirdPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('click', clickHandler);

      resolve(`Third promise was resolved
       only after both left and right clicks happened`);
    }
  };

  document.addEventListener('click', clickHandler);
});

firstPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error.message, true));

secondPromise.then((message) => showNotification(message));

thirdPromise.then((message) => showNotification(message));

window.addEventListener('contextmenu', (e) => e.preventDefault());
