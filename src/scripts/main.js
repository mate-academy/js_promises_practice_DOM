'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => resolve('First resolved!'));
  setTimeout(() => reject(new Error('First rejected!')), 5000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () =>
    resolve('Second resolved!'));

  document.addEventListener('contextmenu', () =>
    resolve('Second resolved!'));
});
const leftButtonPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => resolve());
});

const rightButtonPromise = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', () => resolve());
});

const thirdPromise = new Promise((resolve, reject) => {
  leftButtonPromise
    .then(() => rightButtonPromise)
    .then(() => {
      resolve('Third promise resolved');
    });
});
/* eslint-disable no-console */

firstPromise
  .then(result => console.log(result))
  .catch((error) => console.log(error));

secondPromise
  .then(result => console.log(result));
thirdPromise.then(result => console.log(result));
