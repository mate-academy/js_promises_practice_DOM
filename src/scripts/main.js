'use strict';

const body = document.querySelector('body');
const resolveMessageString = 'promise was resolved';

function createPromise1() {
  return new Promise((resolve, reject) => {
    let clicked = false;

    document.addEventListener('click', () => {
      clicked = true;
      resolve('First');
    });

    setTimeout(() => {
      if (!clicked) {
        reject(new Error('First'));
      }
    }, 3000);
  });
}

function createPromise2() {
  return new Promise((resolve, reject) => {
    document.addEventListener('mousedown', (e) => {
      if ([1, 3].includes(e.which)) {
        resolve('Second');
      }
    });
  });
}

function createPromise3() {
  return new Promise((resolve, reject) => {
    let leftClick = false;
    let rightClick = false;

    document.addEventListener('mousedown', (e) => {
      if (e.which === 1) {
        leftClick = true;
      }

      if (e.which === 3) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        resolve('Third');
      }
    });
  });
}

const promise1 = createPromise1();
const promise2 = createPromise2();
const promise3 = createPromise3();

function makeSuccessMessage(number) {
  body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="success">
    ${number} ${resolveMessageString}
  </div>
  `);
}

function makeErrorMessage(number) {
  body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="warning">
    ${number} promise was rejected
  </div>
  `);
}

promise1
  .then(makeSuccessMessage)
  .catch(makeErrorMessage);

promise2
  .then(makeSuccessMessage)
  .catch(makeErrorMessage);

promise3
  .then(makeSuccessMessage)
  .catch(makeErrorMessage);
