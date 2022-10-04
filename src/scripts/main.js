'use strict';

const body = document.body;

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  body.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function success(message) {
  body.insertAdjacentHTML('beforeend', `
    <div class="success" data-qa="notification">
      ${message}
    </div>
  `);
}

function error(message) {
  body.insertAdjacentHTML('beforeend', `
    <div class="warning" data-qa="notification">
      ${message}
    </div>
  `);
}

firstPromise
  .then(success)
  .catch(error);

secondPromise
  .then(success)
  .catch(error);

thirdPromise
  .then(success)
  .catch(error);
