'use strict';

const root = document.querySelector('body');
const firstSuccess = `
  <div
    data-qa="notification"
    class="success"
  >First promise was resolved</div>`;
const firstWarning = `
  <div
    data-qa="notification"
    class="warning"
  >First promise was rejected</div>`;

const firstPomise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve(firstSuccess);
  });

  setTimeout(() => {
    reject(firstWarning);
  }, 3000);
});

firstPomise
  .then(result => root.insertAdjacentHTML('beforeend', result))
  .catch(err => root.insertAdjacentHTML('beforeend', err));

const secondSuccess = `
  <div
    data-qa="notification"
    class="success"
  >Second promise was resolved</div>`;

const secondPromise = Promise.race([
  new Promise(resolve => {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 1) {
        e.preventDefault();
      } else {
        resolve(secondSuccess);
      }
    });
  }),
  new Promise(resolve => {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 2) {
        resolve(secondSuccess);
      }
    });
  }),
]);

secondPromise
  .then(result => root.insertAdjacentHTML('beforeend', result));

const thirdSuccess = `
  <div
    data-qa="notification"
    class="success"
  >Third promise was resolved</div>`;

const thirdPromise = new Promise(resolve => {
  let leftBtn = false;
  let rightBtn = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftBtn = true;
    }

    if (e.button === 2) {
      rightBtn = true;
    }

    if (leftBtn === true && rightBtn === true) {
      resolve(thirdSuccess);
    }
  });
});

thirdPromise.then(result => root
  .insertAdjacentHTML('beforeend', result));
