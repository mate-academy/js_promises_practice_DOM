'use strict';

const body = document.querySelector('body');

function createMessage(text, className) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = className;
  div.textContent = text;

  body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRigthClicked = false;

  document.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      isLeftClicked = true;
    }

    if (click.button === 2) {
      isRigthClicked = true;
    }

    if (isLeftClicked && isRigthClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(() => createMessage(`First promise was resolved`, 'success'))
  .catch(() => createMessage('First promise was rejected', 'error'));

secondPromise
  .then(() => createMessage(`Second promise was resolved`, 'success'));

thirdPromise
  .then(() => createMessage(`Third promise was resolved`, 'success'));

// comment for another commit to check GitHub
