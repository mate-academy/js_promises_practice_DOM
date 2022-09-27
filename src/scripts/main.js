'use strict';

const body = document.querySelector('body');
let isLeftClicked = false;
let isRightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });
  setTimeout(() => reject(new Error()), 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve();
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    isLeftClicked = true;

    if (isLeftClicked && isRightClicked) {
      resolve();
    }
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    isRightClicked = true;

    if (isLeftClicked && isRightClicked) {
      resolve();
    }
  });
});

firstPromise
  .then(result => {
    resolved('First');
  })
  .catch(er => {
    rejected('First');
  });

secondPromise
  .then(result => {
    resolved('Second');
  })
  .catch(er => {
    rejected('Second');
  });

thirdPromise
  .then(result => {
    resolved('Third');
  })
  .catch(er => {
    rejected('Third');
  });

function resolved(n) {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="success">
    ${n} promise was resolved</div>`);
}

function rejected(n) {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="warning">
    ${n} promise was rejected</div>`);
}
