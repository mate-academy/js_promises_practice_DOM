'use strict';

const clicked = {
  left: false,
  right: false,
};

function notify(message, isSuccess = true) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isSuccess ? 'success' : 'error';
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      document.removeEventListener('click', handleClick);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((msg) => notify(msg, true))
  .catch((err) => notify(err.message, false));

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('click', handleClick);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
});

secondPromise.then((msg) => notify(msg, true));

const thirdPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      clicked.left = true;
    }

    if (e.button === 2) {
      clicked.right = true;
    }

    if (clicked.left && clicked.right) {
      document.removeEventListener('click', handleClick);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
});

thirdPromise.then((msg) => notify(msg, true));

window.addEventListener('contextmenu', (e) => e.preventDefault());
