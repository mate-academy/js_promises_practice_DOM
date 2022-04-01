'use strict';

let timeoutID;

const body = document.querySelector('body');

body.insertAdjacentHTML('beforeend',
  `<div data-qa="notification">

  </div>`
);

const block = body.querySelector('div');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
    clearTimeout(timeoutID);
  });

  timeoutID = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  body.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function onSuccess(message) {
  block.insertAdjacentHTML('beforeend', `<h3>${message}</h3>`);
  block.classList.add('success');
}

function onError(message) {
  block.insertAdjacentHTML('beforeend', `<h3>${message}</h3>`);
  block.classList.add('warning');
}

firstPromise.then(onSuccess, onError);
secondPromise.then(onSuccess, onError);
thirdPromise.then(onSuccess, onError);
