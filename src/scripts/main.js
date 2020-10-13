/* eslint-disable no-console */
'use strict';

function createPromise1() {
  const resolver = (resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('the promise1 works');
    });
    setTimeout(() => reject('Error promise1'), 5000);
  };

  return new Promise(resolver);
}

createPromise1()
  .then(result => {
    console.log(result);
  }).catch(error => {
    console.error(error);
  });

function createPromise2() {
  const resolver = (resolve) => {
    document.addEventListener('click', () => {
      resolve('the promise2 works');
    });

    document.addEventListener('contextmenu', () => {
      resolve('the promise2 works');
    });
  };

  return new Promise(resolver);
}

createPromise2()
  .then(result => {
    console.log(result);
  });

function createPromise3() {
  let twoClicks = [0, 2];
  const resolver = (resolve) => {
    document.addEventListener('mousedown', (event) => {
      twoClicks = twoClicks.filter((click) => click !== event.button);

      if (twoClicks.length === 0) {
        resolve('Left and Right click occurred');
      }
    });
  };

  return new Promise(resolver);
}

createPromise3()
  .then(result => {
    console.log(result);
  });
