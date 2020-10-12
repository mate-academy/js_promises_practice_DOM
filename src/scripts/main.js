'use strict';

/* eslint-disable no-console */

const body = document.querySelector('body');

function firstPromise() {
  const resolver = (resolve, reject) => {
    body.addEventListener('click', () => {
      resolve('Success first promise');
    });

    setTimeout(() => {
      reject('Error first promise');
    }, 5000);
  };

  return new Promise(resolver);
}

const promise1 = firstPromise();

promise1
  .then(
    result => console.log(result),
    error => console.error(error)
  );

function secondPromise() {
  const resolver = resolve => {
    body.addEventListener('click', () => {
      resolve('Success second promise');
    });

    body.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      resolve('Success second promise');
    });
  };

  return new Promise(resolver);
}

const promise2 = secondPromise();

promise2.then(result => console.log(result));

let mouseClickValue = [0, 2];

function thirdPromise() {
  const resolver = resolve => {
    body.addEventListener('mousedown', (event) => {
      event.preventDefault();

      mouseClickValue = mouseClickValue.filter(click => click !== event.button);

      if (mouseClickValue.length === 0) {
        resolve('Success third promise');
      }
    });
  };

  return new Promise(resolver);
}

const promise3 = thirdPromise();

promise3.then(result => console.log(result));
