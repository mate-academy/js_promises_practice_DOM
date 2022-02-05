'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('error'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => pushMessage('First promise was resolved', 'success'))
  .catch(() => pushMessage('First promise was rejected', 'warning'));

secondPromise.then(() => pushMessage('Second promise was resolved', 'success'));

thirdPromise.then(() => pushMessage('Third promise was resolved', 'success'));

function pushMessage(message, className) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${className}">
      ${message}
    </div>
  `);
}
