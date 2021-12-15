'use strict';

const body = document.querySelector('body');

function message(text, cls = 'success') {
  body.insertAdjacentHTML(
    'beforeend',
    `<div class = "${cls}" data-qa="notification">${text}</div>`
  );
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error().toString());
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftBtn = false;
  let rightBtn = false;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftBtn = true;
    }

    if (e.button === 2) {
      rightBtn = true;
    }

    if (leftBtn && rightBtn) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    message('First promise was resolved');
  })
  .catch(() => {
    message('First promise was rejected', 'warning');
  });

secondPromise.then(() => {
  message('Second promise was resolved');
});

thirdPromise.then(() => {
  message('Third promise was resolved');
});
