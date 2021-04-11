'use strict';

const body = document.querySelector('body');

function createFirstPromise() {
  const resolver = function(resolve, reject) {
    document.onclick = () => resolve;
    setTimeout(() => reject(), 3000);
  };

  return new Promise(resolver);
}

function createSecondPromise() {
  const resolver = (resolve, reject) => {
    document.addEventListener('click', resolve);
    document.addEventListener('contextmenu', resolve);
  };

  return new Promise(resolver);
}

function createThirdPromise() {
  const resolver = (resolve, reject) => {
    let isRightClicked = false;
    let isLeftClicked = false;

    document.addEventListener('click', () => {
      if (isRightClicked) {
        resolve();
      }

      isLeftClicked = true;
    });

    document.addEventListener('contextmenu', () => {
      if (isLeftClicked) {
        resolve();
      }

      isRightClicked = true;
    });
  };

  return new Promise(resolver);
}

createFirstPromise().then(() => document.insertAdjacentHTML('afterBegin',
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
