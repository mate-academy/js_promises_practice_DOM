'use strict';

const body = document.querySelector('body');

function createFirstPromise() {
  const resolver = function(resolve, reject) {
    document.addEventListener('mousedown', () => resolve());
    setTimeout(() => reject(), 3000);
  };

  return new Promise(resolver);
}

function createSecondPromise() {
  const resolver = (resolve) => document.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve();
    }
  });

  return new Promise(resolver);
}

function createThirdPromise() {
  const resolver = (resolve) => {
    let isRightClicked = false;
    let isLeftClicked = false;

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        isLeftClicked = true;
      }

      if (e.button === 2) {
        isRightClicked = true;
      }

      if (isRightClicked && isLeftClicked) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
}

createFirstPromise().then(() => body.insertAdjacentHTML('afterBegin',
  `<div class="success" data-qa="notification">
    First promise was resolved
  </div>`))
  .catch(() => body.insertAdjacentHTML('afterBegin',
    `<div class="warning" data-qa="notification">
      First promise was rejected
    </div>`));

createSecondPromise().then(() => body.insertAdjacentHTML('afterBegin',
  `<div class="success" data-qa="notification">
    Second promise was resolved
  </div>`));

createThirdPromise().then(() => body.insertAdjacentHTML('afterBegin',
  `<div class="success" data-qa="notification">
    Third promise was resolved
  </div>`));
