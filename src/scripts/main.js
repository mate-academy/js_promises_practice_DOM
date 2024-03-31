'use strict';

const body = document.querySelector('body');

function createNotification(text, className) {
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

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClicked = false;
  let leftClicked = false;

  document.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      leftClicked = true;
    }

    if (click.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(() => createNotification('First promise was resolved', 'success'))
  .catch(() => createNotification('First promise was rejected', 'error'));

secondPromise.then(() => {
  createNotification(`Second promise was resolved`, 'success');
});

thirdPromise.then(() => {
  createNotification(`Third promise was resolved`, 'success');
});
