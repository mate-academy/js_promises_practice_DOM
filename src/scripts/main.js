'use strict';

const body = document.querySelector('body');
const promiseOne = createPromise(1);
const promiseTwo = createPromise();
const promiseThree = createDoubleClickPromise();

promiseOne
  .then(success, unsuccess);

promiseTwo
  .then(success);

promiseThree
  .then(success);

function createPromise(number) {
  const resolver = number === 1
    ? (complete, cancel) => {
      document.addEventListener('click', () => {
        complete(`First promise was resolved`);
      });

      setTimeout(() => cancel(`First promise was rejected`), 3000);
    }
    : (complete) => {
      document.addEventListener('click', () => {
        complete(`Second promise was resolved`);
      });

      document.addEventListener('contextmenu', () => {
        complete(`Second promise was resolved`);
      });
    };

  return new Promise(resolver);
}

function createDoubleClickPromise() {
  const resolver = (complete) => {
    document.addEventListener('click', () => {
      document.addEventListener('contextmenu', () => {
        complete(`Third promise was resolved`);
      });
    });

    document.addEventListener('contextmenu', () => {
      document.addEventListener('click', () => {
        complete(`Third promise was resolved`);
      });
    });
  };

  return new Promise(resolver);
}

function success(message) {
  const messageBox = `
    <div class="success" data-qa="notification">
      ${message}
    </div>
  `;

  body.insertAdjacentHTML('beforeend', messageBox);
}

function unsuccess(message) {
  const messageBox = `
    <div class="warning" data-qa="notification">
      ${message}
    </div>
  `;

  body.insertAdjacentHTML('beforeend', messageBox);
}
