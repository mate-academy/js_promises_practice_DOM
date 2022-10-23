'use strict';

function notification(className, text) {
  document.body.insertAdjacentHTML('afterbegin', `
  <div class="${className}" data-qa="notification">
    ${text}
  </div>
  `);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 1 || ev.button === 2) {
      resolve(`First promise was resolved `);
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected '));
  }, 3000);
});

promise1
  .then(result => notification('success', result))
  .catch(error => notification(`warning`, error.message));

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved ');
    };
  });
});

promise2
  .then(result => notification('success', result));

const promise3 = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved ');
    }

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise3
  .then(result => notification('success', result));
