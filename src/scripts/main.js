'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const resolveFirst = () => {
    resolve('First promise was resolved');
    document.body.removeEventListener('click', resolveFirst);
  };

  document.body.addEventListener('click', resolveFirst);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((result) => addSuccessMessage(result))
  .catch((error) => addErrorMessage(error));

const secondPromise = new Promise((resolve) => {
  const resolveSecond = () => {
    resolve('Second promise was resolved');
    document.body.removeEventListener('mousedown', resolveSecond);
  };

  document.body.addEventListener('mousedown', resolveSecond);
});

secondPromise.then((result) => addSuccessMessage(result));

const thirdPromise = new Promise((resolve) => {
  let leftPressed = false;
  let rightPressed = false;

  function onMouseDown(e) {
    if (e.button === 0) {
      leftPressed = true;
    }

    if (e.button === 2) {
      rightPressed = true;
    }

    if (leftPressed && rightPressed) {
      resolve('Third promise was resolved');

      document.body.removeEventListener('mousedown', onMouseDown);
      document.body.removeEventListener('mouseup', onMouseUp);
    }
  }

  function onMouseUp(e) {
    if (e.button === 0) {
      leftPressed = false;
    }

    if (e.button === 2) {
      rightPressed = false;
    }
  }

  document.body.addEventListener('mousedown', onMouseDown);
  document.body.addEventListener('mouseup', onMouseUp);

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});

thirdPromise.then((result) => addSuccessMessage(result));

function addSuccessMessage(message) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="success" data-qa="notification">${message}</div>`,
  );
}

function addErrorMessage(message) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="error" data-qa="notification">${message}</div>`,
  );
}
