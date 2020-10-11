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

createPromise1().then(result => {
  // eslint-disable-next-line no-console
  console.log(result);
}).catch(error => {
  // eslint-disable-next-line no-console
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

createPromise2().then(result => {
  // eslint-disable-next-line no-console
  console.log(result);
});

function waitFor(button) {
  return new Promise(resolve => {
    document.addEventListener(button, () => {
      resolve();
    });
  });
}

const leftClick = 'click';
const rightClick = 'contextmenu';
const promise3 = waitFor(leftClick);
const forPromise3 = waitFor(rightClick);

promise3
  .then(() => forPromise3)
  // eslint-disable-next-line no-console
  .then(() => console.log('Left and Right click occurred'));
