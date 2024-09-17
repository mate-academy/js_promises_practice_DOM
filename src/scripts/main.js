'use strict';

// first promise //
const logo = document.querySelector('.logo');
const resolvedContainer = document.createElement('div');
const rejectedContainer = document.createElement('div');

const firstResolver = (resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise resolve result');
  });

  setTimeout(() => {
    return reject('First promise reject result');
  }, 5000);
};

const firstPromise = new Promise(firstResolver);

firstPromise
  .then(result => {
    resolvedContainer.innerText = result;
  })
  .catch(result => {
    rejectedContainer.innerText = result;
  });

logo.before(resolvedContainer);
logo.after(rejectedContainer);

// second promise //
function waitForOneClick(value) {
  return new Promise(resolve => {
    document.addEventListener('click', () => {
      resolve(value);
    });

    document.addEventListener('contextmenu', () => {
      resolve(value);
    });
  });
}

function print(value) {
  // eslint-disable-next-line no-console
  console.log('Second Promise', value);
}

const secondPromise = waitForOneClick('works');

secondPromise
  .then(print);

// third promise //
function waitForBothClicks(event, value) {
  return new Promise(resolve => {
    document.addEventListener(event, () => {
      resolve(value);
    });
  });
}

function printThird(value) {
  // eslint-disable-next-line no-console
  console.log('Third Promise', value);
}

const thirdPromise1 = waitForBothClicks('click', 'works on both clicks');
const thirdPromise2 = waitForBothClicks('contextmenu', 'works on both clicks');

Promise.all([thirdPromise1, thirdPromise2])
  .then(printThird);
