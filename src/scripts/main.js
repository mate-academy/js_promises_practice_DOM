'use strict';

const result = document.querySelector('body');

function createPromise() {
  const resolver = (resolve, reject) => {
    result.addEventListener('click', () => {
      resolve();
    });

    setTimeout(() => {
      reject();
    }, 3000);
  };

  return new Promise(resolver);
}

function createSecond() {
  const resolver = (resolve) => {
    result.addEventListener('click', () => {
      resolve();
    });

    result.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve();
    });
  };

  return new Promise(resolver);
}

function createThird() {
  const resolver = (resolve) => {
    let leftButtonClicked = false;
    let rightButtonClicked = false;

    result.addEventListener('click', () => {
      leftButtonClicked = true;

      if (leftButtonClicked && rightButtonClicked) {
        resolve();
      }
    });

    result.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      rightButtonClicked = true;

      if (leftButtonClicked && rightButtonClicked) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
}

const promise1 = createPromise();
const promise2 = createSecond();
const promise3 = createThird();

promise1.then(onSuccess, onError);
promise2.then(second);
promise3.then(third);

function onSuccess() {
  document.body.insertAdjacentHTML('beforebegin',
    '<div data-qa="notification">First promise was resolved</div>');
}

function onError() {
  document.body.insertAdjacentHTML('beforebegin',
    '<div data-qa="notification">First promise was rejected</div>');
}

function second() {
  document.body.insertAdjacentHTML('beforebegin',
    '<div data-qa="notification">Second promise was resolved</div>');
}

function third() {
  document.body.insertAdjacentHTML('beforebegin',
    '<div data-qa="notification">Third promise was resolved</div>');
}
