'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const promise3 = Promise.all([
  new Promise(resolve => {
    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  }),

  new Promise(resolve => {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 2) {
        resolve();
      }
    });
  }),
]);

function createElement(className, message) {
  body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${className}">${message}</div>
`);
}

promise1
  .then((result) => {
    createElement('success', 'First promise was rejected');
  })
  .catch((error) => {
    createElement('warning', error.message);
  });

promise2
  .then((result) => {
    createElement('success', 'Second promise was resolved');
  });

promise3
  .then((result) => {
    createElement('success', 'Third promise was resolved');
  });
