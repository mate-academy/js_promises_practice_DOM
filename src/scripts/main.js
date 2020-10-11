/* eslint-disable no-console */
'use strict';

const body = document.body;

function firstPromise() {
  const resolver = (resolve, reject) => {
    body.addEventListener('click', () => {
      resolve('Left click');
    });
    setTimeout(() => reject(new Error('more than 5 seconds passed')), 5000);
  };

  return new Promise(resolver);
}

const promise1 = firstPromise();

promise1
  .then(result => console.log(result))
  .catch(error => console.error(error));

function secondPromise() {
  const resolver = (resolve, reject) => {
    body.addEventListener('click', () => {
      resolve('Left click');
    });

    body.addEventListener('contextmenu', () => {
      resolve('Right click');
    });
  };

  return new Promise(resolver);
}

const promise2 = secondPromise();

promise2
  .then(result => console.log(result));

function thirdPromise() {
  const resolver = (resolve, reject) => {
    const eventChecking = [];

    body.addEventListener('click', () => {
      eventChecking.push('left');

      if (eventChecking.length === 2) {
        resolve('Left and Right was clicked');
      }
    });

    body.addEventListener('contextmenu', () => {
      eventChecking.push('right');

      if (eventChecking.length === 2) {
        resolve('Left and Right was clicked');
      }
    });
  };

  return new Promise(resolver);
}

const promise3 = thirdPromise();

promise3
  .then(result => console.log(result));
