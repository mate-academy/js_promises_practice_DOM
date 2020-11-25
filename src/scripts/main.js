'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('Done');
  });

  setTimeout(() => {
    reject(new Error('Time is out'));
  }, 5000);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Left button was click');
  });

  body.addEventListener('contextmenu', () => {
    resolve('Right button was click');
  });
});

const promise3 = new Promise((resolve) => {
  body.addEventListener('click', () => {
    body.addEventListener('contextmenu', () => {
      resolve('Both buttons were click');
    });
  });
});

promise1
  .then((result) => {
    // eslint-disable-next-line no-console
    console.log(result);
  }, (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

promise2
  .then(result => {
    // eslint-disable-next-line no-console
    console.log(result);
  });

promise3
  .then(result => {
    // eslint-disable-next-line no-console
    console.log(result);
  });
