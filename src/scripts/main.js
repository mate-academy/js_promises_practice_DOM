'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First');
  });

  setTimeout(() => {
    reject(new Error('First'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    resolve('Second');
  });

  document.addEventListener('click', () => {
    resolve('Second');
  });
});

const thirdPromise = Promise.all([
  new Promise((resolve) => {
    document.addEventListener('contextmenu', e => {
      e.preventDefault();
      resolve('Third');
    });
  }),
  new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve('Third');
    });
  }),
]);

function success(number) {
  const promiseNumber = (Array.isArray(number))
    ? number[0]
    : number;

  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      ${promiseNumber} promise was resolved
    </div>
  `);
};

function error(number) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${number} promise was rejected
    </div>
  `);
};

firstPromise.then(success, error);
secondPromise.then(success);
thirdPromise.then(success);
