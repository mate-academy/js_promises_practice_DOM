/* eslint-disable no-console */
'use strict';

const twoClicks = ['click', 'contextmenu'];
let waitForClick;

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
  console.log(result);
}).catch(error => {
  console.error(error);
});

function createPromise2() {
  const resolver = (resolve) => {
    document.addEventListener('click', () => {
      waitForClick = 'click';
      resolve('the promise2 works');
    });

    document.addEventListener('contextmenu', () => {
      waitForClick = 'contextmenu';
      resolve('the promise2 works');
    });
  };

  return new Promise(resolver);
}

createPromise2().then(result => {
  console.log(result);
});

function createPromise3() {
  const resolver = (resolve) => {
    document.addEventListener('mousedown', () => {
      if (waitForClick === 'click') {
        twoClicks.shift();
      }

      if (waitForClick === 'contextmenu') {
        twoClicks.pop();
      }

      if (twoClicks.length === 1) {
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
