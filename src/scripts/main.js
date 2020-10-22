/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-console */

'use strict';

function firstPromise() {
  return new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('Resolve 1');
    });

    setTimeout(() => {
      reject('Reject 1');
    }, 5000);
  });
}

function secondPromise() {
  return new Promise((resolve, reject) => {
    document.addEventListener('click', (event) => {
      event.preventDefault();
      resolve('Resolve 2');
    });

    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      resolve('Resolve 2');
    });
  });
}

function thirdPromise() {
  return new Promise((resolve, reject) => {
    let click = false;
    let contextmenu = false;

    document.addEventListener('mousedown', (event) => {
      event.preventDefault();

      if (event.button === 0) {
        click = true;
      }

      if (event.button === 2) {
        contextmenu = true;
      }

      if (click && contextmenu) {
        resolve('Resolve 3');
      }
    });
  });
}

const promiseOne = firstPromise();
const promiseTwo = secondPromise();
const promiseThree = thirdPromise();

promiseOne
  .then(
    result => console.log(result),
    error => console.error(error)
  );

promiseTwo
  .then(
    result => console.log(result)
  );

promiseThree
  .then(
    result => console.log(result)
  );
