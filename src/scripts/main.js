'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve(' First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error(' First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('contextmenu', () => {
    resolve(' Second promise was resolved ');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  document.body.addEventListener('mouseup', (et) => {
    if (et.button === 0) {
      left = true;
    }

    if (et.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved ');
    };
  });
});

function successHandler(result) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="success" data-qa="notification">
      ${result}
    </div>
  `);
};

function errorHandler(error) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="warning" data-qa="notification">
      ${error}
    </div>
  `);
};

firstPromise.then(successHandler, errorHandler);
secondPromise.then(successHandler, errorHandler);
thirdPromise.then(successHandler, errorHandler);
