'use strict';

const body = document.querySelector('body');

const successe = (promiseMessage) => {
  body.insertAdjacentHTML('beforeend', `
  <div class="success" data-qa="notification">
    ${promiseMessage}
  </div>
`);
};

const warning = (promiseMessage) => {
  body.insertAdjacentHTML('beforeend', `
  <div class="warning" data-qa="notification">
    ${promiseMessage}
  </div>
`);
};

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClicked = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClicked = true;
      resolve('Second promise was resolved');
    }

    if (e.button === 2) {
      rightClicked = true;
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (rightClicked && leftClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => successe(result))
  .catch(error => warning(error));

secondPromise
  .then(result => successe(result));

thirdPromise
  .then(result => successe(result));
