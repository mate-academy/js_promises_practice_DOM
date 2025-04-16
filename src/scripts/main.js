'use strict';

const showNotification = (message, isSuccess = true) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isSuccess ? 'success' : 'error';
  div.textContent = message;
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      document.removeEventListener('click', onClick);
      clearTimeout(timeout);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', onClick);

  const timeout = setTimeout(() => {
    document.removeEventListener('click', onClick);
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const onClick = () => {
    document.removeEventListener('click', onClick);
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', onClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const onLeftClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkBoth();
    }
  };

  const onRightClick = () => {
    rightClicked = true;
    checkBoth();
  };

  const checkBoth = () => {
    if (leftClicked && rightClicked) {
      document.removeEventListener('click', onLeftClick);
      document.removeEventListener('contextmenu', onRightClick);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

firstPromise
  .then((msg) => showNotification(msg, true))
  .catch((err) => showNotification(err.message, false));

secondPromise.then((msg) => showNotification(msg, true));

thirdPromise.then((msg) => showNotification(msg, true));

document.addEventListener('contextmenu', (e) => e.preventDefault());
