'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});
const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
      CheckBothClicks(resolve);
    }
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    CheckBothClicks(resolve);
  });

  function CheckBothClicks(r) {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  }
});

firstPromise
  .then((message) => {
    createSuccessDiv(message);
  })
  .catch((message) => {
    createErrorDiv(message);
  });

secondPromise.then((message) => {
  createSuccessDiv(message);
});

thirdPromise.then((message) => {
  createSuccessDiv(message);
});

function createSuccessDiv(message) {
  const div = document.createElement('div');

  div.textContent = message;
  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  document.body.append(div);
}

function createErrorDiv(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = message;
  document.body.append(div);
}
