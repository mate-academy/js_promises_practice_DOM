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

const thirdPromise = new Promise((resolve, reject) => {
  let events = ['click', 'contextmenu'];

  document.addEventListener('contextmenu', (event) => {
    events = events.filter((e) => e !== event.type);

    if (events.length === 0) {
      resolve('third resolved');
    }
  });

  document.addEventListener('click', (event) => {
    events = events.filter((e) => e !== event.type);

    if (events.length === 0) {
      resolve('Third resolved');
    }
  });
});
/* eslint-disable no-console */

firstPromise
  .then(result => console.log(result))
  .catch((error) => console.log(error));

secondPromise
  .then(result => console.log(result));

thirdPromise.then(result => console.log(result));
