'use strict';

const body = document.querySelector('body');

document.addEventListener('contextmenu', e => e.preventDefault());

function notification(text, newClass = 'success') {
  body.insertAdjacentHTML('beforeend', `
    <div class="${newClass}" data-qa="notification"> ${text}</div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(Error());
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftBtn = false;
  let rightBtn = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftBtn = true;
    } else if (e.button === 2) {
      rightBtn = true;
    }

    if (rightBtn && leftBtn) {
      resolve();
    }
  });
});

firstPromise
  .then(() => notification('First promise was resolved'))
  .catch(() => notification('First promise was rejected', 'warning'));

secondPromise
  .then(() => notification('Second promise was resolved'));

thirdPromise
  .then(() => notification('Third promise was resolved'));
