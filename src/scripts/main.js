'use strict';

let isClicked = false;

function message(mess, cond) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(cond);
  div.textContent = mess;

  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  function handler(e) {
    if (e.button === 0) {
      resolve('First promise was resolved');
      isClicked = true;
      document.removeEventListener('click', handler);
    }
  }

  document.addEventListener('click', handler);

  setTimeout(() => {
    if (!isClicked) {
      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
      // eslint-disable-next-line max-len
      document.removeEventListener('click', handler); // теперь handler определён!
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  function handler(e) {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      isClicked = true;
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    }
  }

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

const thirdPromise = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  function handler(e) {
    if (e.button === 0 && e.type === 'click') {
      left = true;
    }

    if (e.type === 'contextmenu' && e.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve(
        // eslint-disable-next-line max-len
        'Third promise was resolved only after both left and right clicks happened',
      );
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    }
  }

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

firstPromise
  .then((value) => message(value, 'success'))
  .catch((err) => message(err.message, 'error'));

secondPromise.then((value) => message(value, 'success'));

thirdPromise
  .then((value) => message(value, 'success'))
  .catch((err) => message(err.message, 'error'));
