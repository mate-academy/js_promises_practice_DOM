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

function createEventPromise(eventName) {
  const resolver = (resolve, reject) => {
    body.addEventListener(eventName, () => {
      resolve(eventName);
    });
  };

  return new Promise(resolver);
}

const promise3 = createEventPromise('click');
const promise4 = createEventPromise('contextmenu');

Promise.all([promise3, promise4])
  .then(() => console.log('Left and Right clicks'));
