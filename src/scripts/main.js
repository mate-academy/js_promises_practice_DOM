'use strict';

const promiseFirst = new Promise((resolve, reject) => {
  let clicked = false;

  const handler = (e) => {
    if (e.button === 0) {
      clicked = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', handler);
    }
  };

  document.addEventListener('click', handler);

  setTimeout(function () {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', handler);
    }
  }, 3000);
});

const promiseSecond = new Promise((resolve, reject) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handler);
    }
  };

  document.addEventListener('click', handler);
});

const promiseThird = new Promise((resolve, reject) => {
  let clicked1 = false;
  let clicked2 = false;
  let resolved = false;

  const handler = (e) => {
    if (e.button === 0) {
      clicked1 = true;
    }

    if (e.button === 2) {
      clicked2 = true;
    }

    if (clicked1 && clicked2 && !resolved) {
      resolved = true;
      resolve('Third promise was resolved');
      document.removeEventListener('click', handler);
    }
  };

  document.addEventListener('click', handler);
});

function handleMessage(state, message) {
  const divMessage = document.createElement('div');

  divMessage.dataset.qa = 'notification';
  document.body.append(divMessage);
  divMessage.className = state;
  divMessage.textContent = message;
}

promiseFirst
  .then((res) => handleMessage('success', res))
  .catch((err) => handleMessage('error', err.message));

promiseSecond.then((res) => handleMessage('success', res));

promiseThird.then((res) => handleMessage('success', res));
