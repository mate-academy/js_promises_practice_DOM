'use strict';

const root = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  root.addEventListener('click', () =>
    resolve('First promise was resolved'));

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  root.addEventListener('click', () =>
    resolve('Second promise was resolved'));

  root.addEventListener('contextmenu', () =>
    resolve('Second promise was resolved'));
});

const thirdPromise = new Promise(resolve => {
  let left = false;
  let right = false;

  root.addEventListener('mouseup', elem => {
    if (elem.button === 0) {
      left = true;
    }

    if (elem.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  });
});

function success(message) {
  return root.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="success">
    ${message}
    </div>
  `);
};

function error(message) {
  return root.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="error">
    ${message}
    </div>
  `);
}

firstPromise.then(success, error);

secondPromise.then(success);

thirdPromise.then(success);
