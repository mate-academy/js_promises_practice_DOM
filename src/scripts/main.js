'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  let settled = false;
  const timeOutId = setTimeout(() => {
    if (settled) {
      return;
    }
    settled = true;
    cleanUp();
    reject('First promise was rejected');
  }, 3000);

  function cleanUp() {
    clearTimeout(timeOutId);
    document.removeEventListener('click', onClick);
  }

  function onClick() {
    if (settled) {
      return;
    }
    settled = true;
    cleanUp();
    resolve('First promise was resolved');
  }
  document.addEventListener('click', onClick);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (ev) => {
      if (ev.button === 0 || ev.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const promise3 = new Promise((resolve) => {
  let settled = false;
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', onMousedown);

  function onMousedown(ev) {
    if (settled) {
      return;
    }

    if (ev.button === 0) {
      leftClicked = true;
    }

    if (ev.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      settled = true;
      cleanUp();
      resolve('Third promise was resolved');
    }
  }

  function cleanUp() {
    document.removeEventListener('mousedown', onMousedown);
  }
});

function showMessage(message, error = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  if (error) {
    div.classList.add('error');
  } else {
    div.classList.add('success');
  }
  div.textContent = message;
  body.append(div);
}

function handlerPromise(promise) {
  promise.then(
    (message) => showMessage(message),
    (message) => showMessage(message, true),
  );
}
handlerPromise(promise1);
handlerPromise(promise2);
handlerPromise(promise3);
