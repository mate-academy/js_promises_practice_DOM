'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function appendNotif(message, type) {
  const divBlock = document.createElement('div');

  divBlock.setAttribute('data-qa', 'notification');
  divBlock.setAttribute('class', `${type}`);
  divBlock.innerText = message;

  document.body.appendChild(divBlock);
}

const firstPromise = new Promise((resolve, reject) => {
  const handler = () => {
    resolve();
  };

  document.addEventListener('click', handler, { once: true });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject();
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  };

  document.addEventListener('mousedown', handler, { once: true });
});

const thirdPromise = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  const handler = (e) => {
    if (e.button === 0) {
      left = true;
    } else if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      document.removeEventListener('mousedown', handler);
      resolve();
    }
  };

  document.addEventListener('mousedown', handler);
});

firstPromise
  .then(() => appendNotif('First promise was resolved', 'success'))
  .catch(() => appendNotif('First promise was rejected', 'error'));
secondPromise.then(() => appendNotif('Second promise was resolved', 'success'));
thirdPromise.then(() => appendNotif('Third promise was resolved', 'success'));
