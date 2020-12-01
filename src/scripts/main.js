'use strict';

const button = document.querySelector('.logo');
const promise1 = new Promise((resolve, reject) => {
  button.addEventListener('click', () => {
    resolve('Success: Promise 1!');
  });
  // eslint-disable-next-line prefer-promise-reject-errors
  setTimeout(() => reject('Error: Promise 1!'), 5000);
});

const promise2 = new Promise(resolve => {
  button.addEventListener('mousedown', (e) => {
    if (e.which !== 2) {
      resolve('Success: Promise 2!');
    }
  });
});

const promise3 = new Promise(resolve => {
  const arr = [];

  button.addEventListener('mousedown', (e) => {
    if (!arr.includes(e.which) && e.which !== 2) {
      arr.push(e.which);

      if (arr.length === 2) {
        resolve(`Success: Promise 3!`);
      }
    }
  });
});

promise1
  // eslint-disable-next-line no-console
  .then(result => console.log(result))
  // eslint-disable-next-line no-console
  .catch(error => console.warn(error));
// eslint-disable-next-line no-console
promise2.then(result => console.log(result));
// eslint-disable-next-line no-console
promise3.then(result => console.log(result));
