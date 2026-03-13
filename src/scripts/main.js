'use strict';

/** first promise */
const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);

      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);

  const timer = setTimeout(() => {
    document.removeEventListener('click', handleClick);

    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

/** second promise */
const secondPromise = new Promise((resolve) => {
  const handleMouse = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', handleMouse);

      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleMouse);
});

/** third promise */
const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const handleMouse = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('mousedown', handleMouse);

      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleMouse);
});

/** success and error */
function showMessage(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;

  document.body.appendChild(div);
}

firstPromise
  .then((message) => showMessage(message, 'success'))
  .catch((message) => showMessage(message, 'error'));

secondPromise
  .then((message) => showMessage(message, 'success'))
  .catch((message) => showMessage(message, 'error'));

thirdPromise
  .then((message) => showMessage(message, 'success'))
  .catch((message) => showMessage(message, 'error'));
