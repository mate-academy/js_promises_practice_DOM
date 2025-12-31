'use strict';

// helper to show notification
function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = message;
  div.className = isError ? 'error' : 'success';

  document.body.appendChild(div);
}

/* =========================
   FIRST PROMISE
   ========================= */

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  function handleClick(e) {
    if (e.button === 0) {
      clicked = true;
      document.removeEventListener('click', handleClick);

      resolve('First promise was resolved on a left click in the document');
    }
  }

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    if (!clicked) {
      document.removeEventListener('click', handleClick);

      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
    }
  }, 3000);
});

firstPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error.message, true));

/* =========================
   SECOND PROMISE
   ========================= */

const secondPromise = new Promise((resolve, reject) => {
  function handleMouseDown(e) {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', handleMouseDown);
      resolve('Second promise was resolved');
    }
  }

  document.addEventListener('mousedown', handleMouseDown);
});

secondPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error.message, true));

/* =========================
   THIRD PROMISE
   ========================= */

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkResolve() {
    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', handleMouseDown);

      resolve(
        `Third promise was resolved only after
        both left and right clicks happened`,
      );
    }
  }

  function handleMouseDown(e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    checkResolve();
  }

  document.addEventListener('mousedown', handleMouseDown);
});

thirdPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error.message, true));
