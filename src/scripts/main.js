'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const onClick = (e) => {
    clearTimeout(timeoutId);
    resolve('First promise was resolved on a left click');
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('click', onClick);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  let leftDone = false;
  let rightDone = false;

  const onMouseDown = (e) => {
    if (e.button === 0) {
      leftDone = true;
    } else if (e.button === 2) {
      rightDone = true;
    }

    if (leftDone && rightDone) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

function createMessage(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('message');
  div.classList.add(isError ? 'error' : 'success');
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then((message) => {
    createMessage(message, false);
  })
  .catch((message) => {
    createMessage(message, true);
  });

secondPromise.then((message) => {
  createMessage(message, false);
});

thirdPromise.then((message) => {
  createMessage(message, false);
});
