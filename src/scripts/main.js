'use strict';

function createFirstPromise() {
  return new Promise((resolve, reject) => {
    let isClicked = false;

    document.addEventListener('click', () => {
      isClicked = true;
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      if (!isClicked) {
        reject(new Error('First promise was rejected'));
      }
    }, 3000);
  });
}

function createSecondPromise() {
  return new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('Second promise was resolved');
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    });
  });
}

function createThirdPromise() {
  return new Promise((resolve, reject) => {
    const isClicked = {
      left: false,
      right: false,
    };

    document.addEventListener('click', () => {
      isClicked.left = true;
      checkBothClicks();
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      isClicked.right = true;
      checkBothClicks();
    });

    function checkBothClicks() {
      if (isClicked.left && isClicked.right) {
        resolve('Third promise was resolved');
      }
    }
  });
}

function createNotification(message, hasError = false) {
  const handler = document.createElement('div');

  handler.setAttribute('data-qa', 'notification');
  handler.classList.add(hasError ? 'error' : 'success');
  handler.textContent = message;

  document.body.appendChild(handler);
}

const promise1 = createFirstPromise();
const promise2 = createSecondPromise();
const promise3 = createThirdPromise();

promise1
  .then((data) => createNotification(data))
  .catch((error) => createNotification(error.message, true));

promise2
  .then((data) => createNotification(data))
  .catch((error) => createNotification(error.message, true));

promise3
  .then((data) => createNotification(data))
  .catch((error) => createNotification(error.message, true));
