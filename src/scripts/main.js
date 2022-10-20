'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  const leftClick = false;
  const rightClick = false;

  if (leftClick && rightClick) {
    resolve('Third promise was resolved');
  }
});

function success(message) {
  document.body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="success">
        ${message}
      </div>
      `);
}

function error(message) {
  document.body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="warning">
        ${message}
      </div>
      `);
}

firstPromise
  .then(success)
  .catch(error);

secondPromise
  .then(success);

thirdPromise
  .then(success);
