'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First`);
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject(`First`);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 2 || e.button === 0) {
      resolve(`Second`);
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClick;
  let leftClick;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(`Third`);
    }
  });
});

firstPromise
  .then(onSuccess)
  .catch(onError);

secondPromise
  .then(onSuccess);

thirdPromise
  .then(onSuccess);

function onSuccess(message) {
  document.body.insertAdjacentHTML('afterbegin', `
    <div data-qa="notification" class="success">
      ${message} promise was resolved
    </div>
    `);
}

function onError(message) {
  document.body.insertAdjacentHTML('afterbegin', `
    <div data-qa="notification" class="warning">
      ${message} promise was rejected
    </div>
    `);
}
