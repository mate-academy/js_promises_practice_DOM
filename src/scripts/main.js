'use strict';

const logo = document.querySelector('.logo');

function createPromise1() {
  return new Promise((resolve, reject) => {
    let clicked = false;

    document.addEventListener('click', () => {
      clicked = true;
      resolve();
    });

    setTimeout(() => {
      if (!clicked) {
        reject(new Error('Rejected'));
      }
    }, 3000);
  });
}

function createPromise2() {
  return new Promise((resolve, reject) => {
    document.addEventListener('mousedown', (e) => {
      if ([1, 3].includes(e.which)) {
        resolve();
      }
    });
  });
}

function createPromise3() {
  return new Promise((resolve, reject) => {
    let left = false;
    let right = false;

    document.addEventListener('mousedown', (e) => {
      if (e.which === 1) {
        left = true;
      }

      if (e.which === 3) {
        right = true;
      }

      if (left && right) {
        resolve();
      }
    });
  });
}

const promise1 = createPromise1();
const promise2 = createPromise2();
const promise3 = createPromise3();

function firstResolve() {
  logo.insertAdjacentHTML('afterend', `
  <div data-qa="notification" class="success">First promise was resolved</div>
  `);
}

function firstReject() {
  logo.insertAdjacentHTML('afterend', `
  <div data-qa="notification" class="warning">First promise was rejected</div>
  `);
}

function secondResolve() {
  logo.insertAdjacentHTML('afterend', `
  <div data-qa="notification" class="success">Second promise was resolved</div>
  `);
}

function secondReject() {
  logo.insertAdjacentHTML('afterend', `
  <div data-qa="notification" class="success">Second promise was rejected</div>
  `);
}

function thirdResolve() {
  logo.insertAdjacentHTML('afterend', `
  <div data-qa="notification" class="success">Third promise was resolved</div>
  `);
}

function thirdReject() {
  logo.insertAdjacentHTML('afterend', `
  <div data-qa="notification" class="success">Third promise was rejected</div>
  `);
}

promise1
  .then(firstResolve)
  .catch(firstReject);

promise2
  .then(secondResolve)
  .catch(secondReject);

promise3
  .then(thirdResolve)
  .catch(thirdReject);
