'use strict';

const body = document.querySelector('body');

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

promise1
  .then(() => {
    printPromiseResult('First promise was resolved', 'success');
  })
  .catch(() => {
    printPromiseResult('First promise was rejected', 'warning');
  });

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

promise2
  .then(() => {
    printPromiseResult('Second promise was resolved', 'success');
  });

const promise3 = new Promise((resolve, reject) => {
  let leftButtonDown = false;
  let rightButtonDown = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButtonDown = true;
    }

    if (e.button === 2) {
      rightButtonDown = true;
    }

    if (rightButtonDown === true && leftButtonDown === true) {
      resolve();
    }
  });
});

promise3
  .then(() => {
    printPromiseResult('Third promise was resolved', 'success');
  });

function printPromiseResult(text, className) {
  body.insertAdjacentHTML('beforeend', `
    <div class="${className}" data-qa="notification">
      ${text}
    </div>
  `);
}
