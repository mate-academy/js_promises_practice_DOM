'use strict';

const body = document.querySelector('body');

function pushNotification(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.innerText = message;

  body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('mouseup', handleClick);
    }
  };

  document.addEventListener('mouseup', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('mouseup', handleClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mouseup', handleClick);
    }
  };

  document.addEventListener('mouseup', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('mouseup', handleClick);
    }
  };

  document.addEventListener('mouseup', handleClick);
});

[firstPromise, secondPromise, thirdPromise].forEach((promise) => {
  promise
    .then((result) => pushNotification(result, 'success'))
    .catch((error) => pushNotification(error.message, 'error'));
});
