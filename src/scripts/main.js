'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type === 'error' ? 'error' : 'success');
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  let resolvedOrRejected = false;

  const onClick = (eve) => {
    if (eve.button === 0 && !resolvedOrRejected) {
      resolvedOrRejected = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    if (!resolvedOrRejected) {
      resolvedOrRejected = true;
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', onClick);
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const onAnyClick = (eve) => {
    if (eve.button === 0 || eve.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', onAnyClick);
      document.removeEventListener('contextmenu', onContextMenu);
    }
  };

  const onContextMenu = (eve) => {
    eve.preventDefault();
    resolve('Second promise was resolved');
    document.removeEventListener('click', onAnyClick);
    document.removeEventListener('contextmenu', onContextMenu);
  };

  document.addEventListener('click', onAnyClick);
  document.addEventListener('contextmenu', onContextMenu);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const check = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onLeft);
      document.removeEventListener('contextmenu', onRight);
    }
  };

  const onLeft = (eve) => {
    if (eve.button === 0) {
      leftClicked = true;
      check();
    }
  };

  const onRight = (eve) => {
    eve.preventDefault();
    rightClicked = true;
    check();
  };

  document.addEventListener('click', onLeft);
  document.addEventListener('contextmenu', onRight);
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

secondPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

thirdPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));
