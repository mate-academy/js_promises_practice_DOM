'use strict';

/* eslint no-console: ["error", { allow: ["warn"] }] */

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
  .then(result => console.log(result)) // eslint-disable-line no-console
  .catch(error => console.error(error)); // eslint-disable-line no-console

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

promise2.then(result => console.log(result)); // eslint-disable-line no-console

function thirdPromise(click, value) {
  return new Promise(resolve => {
    body.addEventListener(click, (event) => {
      event.preventDefault();

      resolve(value);
    });
  });
}

const promise3 = thirdPromise('click');
const promise4 = thirdPromise('contextmenu', 'Success third promise');

promise3
  .then(() => promise4)
  .then(result => console.log(result)); // eslint-disable-line no-console
