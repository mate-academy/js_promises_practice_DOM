'use strict';

const body = document.querySelector('body');

function createPromis() {
  const resolver = (resolve, reject) => {
    body.addEventListener('mousedown', () => {
      resolve();
    });

    setTimeout(() => {
      reject();
    }, 3000);
  };

  return new Promise(resolver);
}

function createPromis2() {
  const resolver = (resolve) => {
    body.addEventListener('mousedown', e => {
      if (e.button === 0 || e.button === 2) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
}

function createPromis3() {
  const resolver = (resolve) => {
    let leftButton = false;
    let rightButton = false;

    body.addEventListener('mousedown', e => {
      if (e.button === 0) {
        leftButton = true;
      }

      if (e.button === 2) {
        rightButton = true;
      }

      if (leftButton && rightButton) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
}

const promise1 = createPromis();
const promise2 = createPromis2();
const promise3 = createPromis3();

promise1
  .then(onSuccess1)
  .catch(onError1);

promise2
  .then(onSuccess2);

promise3
  .then(onSuccess3);

function onSuccess1() {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="message success">
    First promise was resolved</div>`);
};

function onError1() {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="message warning">
    First promise was rejected</div>`);
};

function onSuccess2() {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="message success">
    Second promise was resolved</div>`);
};

function onSuccess3() {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="message success">
    Third promise was resolved</div>`);
};
