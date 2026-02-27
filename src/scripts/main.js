'use strict';

document.body.oncontextmenu = (e) => e.preventDefault();

const firstPromise = new Promise((resolve, reject) => {
  const timeOutId = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.body.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        clearTimeout(timeOutId);
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  let wasClickLeft = false;
  let wasClickRight = false;

  const handler = (e) => {
    if (e.button === 0) {
      wasClickLeft = true;
    }

    if (e.button === 2) {
      wasClickRight = true;
    }

    if (wasClickLeft && wasClickRight) {
      resolve('Third promise was resolved');
      document.body.removeEventListener('mousedown', handler);
    }
  };

  document.body.addEventListener('mousedown', handler);
});

firstPromise.then(success).catch(error);

secondPromise.then(success);

thirdPromise.then(success);

function success(msg) {
  const not = document.createElement('div');

  not.classList.add('success');
  not.dataset.qa = 'notification';
  not.textContent = msg;

  document.body.append(not);
}

function error(msg) {
  const not = document.createElement('div');

  not.classList.add('error');
  not.dataset.qa = 'notification';
  not.textContent = msg;
  document.body.append(not);
}
