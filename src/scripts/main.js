'use strict';

function createFirstPromise() {
  const resolver = (resolved, rejected) => {
    document.addEventListener('click', () => {
      return resolved('Success, Promise 1');
    });
    setTimeout(() => rejected(new Error('Error, Promis 1')), 5000);
  };

  return new Promise(resolver);
}

function createSecondPromise() {
  const resolver = (resolved, rejected) => {
    document.addEventListener('mousedown', (e) => {
      if (e.which === 1 || e.which === 3) {
        return resolved('Success, Promise 2');
      }
    });
    setTimeout(() => rejected(new Error('Error, Promise 2')), 5000);
  };

  return new Promise(resolver);
}

function createThirdPromise() {
  const resolver = (resolved, rejected) => {
    let leftClick = false;
    let rightClick = false;

    document.addEventListener('click', (e) => {
      leftClick = true;

      if (!rightClick) {
        return;
      };

      return resolved('Success, Promise 3');
    });

    document.addEventListener('contextmenu', (e) => {
      rightClick = true;

      if (!leftClick) {
        return;
      };

      return resolved('Success, Promise 3');
    });

    setTimeout(() => rejected(new Error('Error, Promise 3')), 5000);
  };

  return new Promise(resolver);
}

const promise1 = createFirstPromise();
const promise2 = createSecondPromise();
const promise3 = createThirdPromise();

promise1
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

promise2
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

promise3
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
