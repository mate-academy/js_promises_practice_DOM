'use strict';

const BODY = document.body;

function showSuccess(result) {
  const MESSAGE = document.createElement('div');

  MESSAGE.dataset.qa = 'notification';
  MESSAGE.innerText = result;
  MESSAGE.classList.add('success');

  BODY.append(MESSAGE);
}

function showWarning(error) {
  const MESSAGE = document.createElement('div');

  MESSAGE.dataset.qa = 'notification';
  MESSAGE.innerText = error;
  MESSAGE.classList.add('warning');

  BODY.append(MESSAGE);
}

const PROMISE1 = new Promise((resolve, reject) => {
  BODY.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const PROMISE2 = new Promise((resolve, reject) => {
  BODY.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  BODY.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const PROMISE3 = new Promise((resolve, reject) => {
  let checker = '';

  BODY.addEventListener('click', () => {
    checker += 1;

    if (checker.includes('1') && checker.includes('2')) {
      resolve('Third promise was resolved');
    }
  });

  BODY.addEventListener('contextmenu', () => {
    checker += 2;

    if (checker.includes('1') && checker.includes('2')) {
      resolve('Third promise was resolved');
    }
  });
});

PROMISE1
  .then(showSuccess, showWarning);

PROMISE2
  .then(showSuccess);

PROMISE3
  .then(showSuccess);
