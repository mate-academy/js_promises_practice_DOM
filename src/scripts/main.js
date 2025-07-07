'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let settled = false;

  const handleClick = (e) => {
    if (settled) {
      return;
    }

    if (e.button !== 0) {
      return;
    }

    settled = true;
    resolve('First promise was resolved');
    document.removeEventListener('click', handleClick);
    clearTimeout(id);
  };

  const id = setTimeout(() => {
    if (settled) {
      return;
    }

    settled = true;
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', handleClick);
  }, 3000);

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve) => {
  let settled = false;

  const handleClick = (e) => {
    if (e.button === 0 && !settled) {
      settled = true;
      resolve('Second promise was resolved');
      cleanup();
    }
  };

  const handleRightClick = (e) => {
    if (!settled) {
      settled = true;
      e.preventDefault();
      resolve('Second promise was resolved');
      cleanup();
    }
  };

  const cleanup = () => {
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleRightClick);
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleRightClick);
});

const thirdPromise = new Promise((resolve) => {
  const clicked = { left: false, right: false };

  const checkSuccess = () => {
    if (clicked.left && clicked.right) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
    }
  };

  const handleLeftClick = (e) => {
    if (e.button === 0) {
      clicked.left = true;
    }

    checkSuccess();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    clicked.right = true;
    checkSuccess();
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

const resHandler = (message, resType) => {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(resType);
  div.textContent = message;

  body.appendChild(div);
};

firstPromise
  .then((message) => resHandler(message, 'success'))
  .catch((message) => resHandler(message, 'error'));

secondPromise
  .then((message) => resHandler(message, 'success'))
  .catch((message) => resHandler(message, 'error'));

thirdPromise
  .then((message) => resHandler(message, 'success'))
  .catch((message) => resHandler(message, 'error'));
