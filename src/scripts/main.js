/* eslint-disable prefer-promise-reject-errors */
'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  function handleClick(e) {
    if (e.button === 0) {
      clearTimeout(timerId);
      document.removeEventListener('click', handleClick);
      resolve('First promise was resolved');
    }
  }

  const timerId = setTimeout(() => {
    document.removeEventListener('click', handleClick);

    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve) => {
  function handleLeft() {
    document.removeEventListener('click', handleLeft);
    document.removeEventListener('contextmenu', handleRight);
    resolve('Second promise was resolved');
  }

  function handleRight() {
    document.removeEventListener('click', handleLeft);
    document.removeEventListener('contextmenu', handleRight);
    resolve('Second promise was resolved');
  }

  document.addEventListener('click', handleLeft);
  document.addEventListener('contextmenu', handleRight);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function handleLeft() {
    leftClicked = true;

    if (rightClicked) {
      document.removeEventListener('click', handleLeft);
      document.removeEventListener('contextmenu', handleRight);
      resolve('Third promise was resolved');
    }
  }

  function handleRight() {
    rightClicked = true;

    if (leftClicked) {
      document.removeEventListener('click', handleLeft);
      document.removeEventListener('contextmenu', handleRight);
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', handleLeft);
  document.addEventListener('contextmenu', handleRight);
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((message) => showNotification(message, 'error'));

secondPromise.then((message) => showNotification(message, 'success'));

thirdPromise.then((message) => showNotification(message, 'success'));
