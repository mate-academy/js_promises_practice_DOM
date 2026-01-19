'use strict';

const body = document.querySelector('body');
const addMessage = (success = true, message) => {
  const div = document.createElement('div');
  const divClass = success ? 'success' : 'error';

  div.classList.add(divClass);
  div.dataset.qa = 'notification';
  div.innerText = message;
  body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const rejectTimeoutId = setTimeout(() => {
    cleanup();
    reject(new Error('First promise was rejected'));
  }, 3000);

  function onClick() {
    cleanup();
    resolve('First promise was resolved');
  }

  function cleanup() {
    clearTimeout(rejectTimeoutId);
    document.removeEventListener('click', onClick);
  }

  document.addEventListener('click', onClick);
});
const secondPromise = new Promise(function (resolve, reject) {
  function onMouseUp(e) {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mouseup', onMouseUp);
      resolve('Second promise was resolved');
    }
  }

  document.addEventListener('mouseup', onMouseUp);
});
const thirdPromise = new Promise(function (resolve, reject) {
  let leftClick = false;
  let rightClick = false;

  function onMouseUp(e) {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('mouseup', onMouseUp);
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('mouseup', onMouseUp);
});

firstPromise.then(
  (m) => addMessage(true, m),
  (error) => addMessage(false, error.message),
);

secondPromise.then(
  (m) => addMessage(true, m),
  (error) => addMessage(false, error.message),
);

thirdPromise.then(
  (m) => addMessage(true, m),
  (error) => addMessage(false, error.message),
);
