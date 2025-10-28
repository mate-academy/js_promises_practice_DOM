'use strict';

function handler(result, stat) {
  const div = document.createElement('div');

  div.className = stat;
  div.dataset.qa = 'notification';
  div.textContent = result;

  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 2 || e.button === 0) {
      resolve(`Second promise was resolved`);
    }
  });
});

let leftClick = 0;
let rightClick = 0;

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = 1;
    }

    if (e.button === 2) {
      rightClick = 1;
    }

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  });
});

firstPromise
  .then((result) => {
    handler(result, 'success');
  })
  .catch((error) => {
    handler(error, 'error');
  });

secondPromise
  .then((result) => {
    handler(result, 'success');
  })
  .catch((error) => {
    handler(error, 'error');
  });

thirdPromise
  .then((result) => {
    handler(result, 'success');
  })
  .catch((error) => {
    handler(error, 'error');
  });
