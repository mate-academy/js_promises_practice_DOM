'use strict';

function createMessage(className, text) {
  const h1 = document.querySelector('h1');

  h1.insertAdjacentHTML('afterend',
    `
    <div data-qa="notification" class="${className}">${text}</div>
    `
  );
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('Error'));
  }, 3000);
});

firstPromise
  .then(() => createMessage('success', 'First promise was resolved'))
  .catch(() => createMessage('warning', 'First promise was rejected'));

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

secondPromise
  .then(() =>
    createMessage('success success-down-second',
      'Second promise was resolved'));

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      rightClick = true;
    }

    if (e.button === 2) {
      leftClick = true;
    }

    if (rightClick && leftClick) {
      resolve();
    }
  });
});

thirdPromise
  .then(() =>
    createMessage('success success-down-third', 'Third promise was resolved'));
