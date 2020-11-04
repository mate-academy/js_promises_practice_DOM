'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise resolved');
  });

  setTimeout(() => reject(new Error('First promise rejected')), 5000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0 || event.button === 2) {
      resolve('Second promise resolved');
    }
  });
});

const promise31 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      resolve();
    }
  });
});

const promise32 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (event) => {
    if (event.button === 2) {
      resolve();
    }
  });
});

const promise3 = Promise.all([promise31, promise32]);

promise1
  .then(result => {
    // eslint-disable-next-line no-console
    console.log(result);
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.warn(error);
  });

promise2
  .then(result => {
    // eslint-disable-next-line no-console
    console.log(result);
  });

promise3
  .then(result => {
    // eslint-disable-next-line no-console
    console.log('Third promise resolved');
  });
