'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    document.removeEventListener('click', handleClick);

    reject(new Error('First promise was rejected'));
  }, 3000);

  function handleClick(e) {
    if (e.button !== 0) {
      return;
    }

    clearTimeout(timerId);
    document.removeEventListener('click', handleClick);

    resolve('First promise was resolved');
  }

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve) => {
  function handleMouseDown(e) {
    if (e.button !== 0 && e.button !== 2) {
      return;
    }

    document.removeEventListener('mousedown', handleMouseDown);

    resolve('Second promise was resolved');
  }

  document.addEventListener('mousedown', handleMouseDown);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function handleMouseDown(e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', handleMouseDown);

      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('mousedown', handleMouseDown);
});

const showNotification = (message, isError = false) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isError ? 'error' : 'success';
  div.textContent = message;
  document.body.appendChild(div);
};

firstPromise.then(
  (message) => showNotification(message),
  (error) => showNotification(error.message, true),
);

secondPromise.then((message) => showNotification(message));

thirdPromise.then((message) => showNotification(message));
