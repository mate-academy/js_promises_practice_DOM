'use strict';

function getNotification(message, isError = false) {
  const div = document.createElement('div');

  div.classList.add(isError ? 'error' : 'success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  return div;
}

function handleSuccess(message) {
  const notification = getNotification(message);

  document.body.appendChild(notification);
}

function handleError(error) {
  const notification = getNotification(error.message, true);

  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise.then(handleSuccess).catch(handleError);

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then(handleSuccess).catch(handleError);

const thirdPromise = new Promise((resolve, reject) => {
  const clicked = {
    left: false,
    right: false,
  };

  function checkClicks() {
    if (clicked.left && clicked.right) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    clicked.left = true;
    checkClicks();
  });

  document.addEventListener('contextmenu', () => {
    clicked.right = true;
    checkClicks();
  });
});

thirdPromise.then(handleSuccess).catch(handleError);
