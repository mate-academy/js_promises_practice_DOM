/* eslint-disable no-console */
'use strict';

let leftButtonDown = false;
let rightButtonDown = false;

const promise1 = new Promise(function(resolve, reject) {
  document.addEventListener('click', () => {
    resolve('First promise - Hi, Mate!');
  });
  setTimeout(() => reject(new Error('First Promise - Bye, Mate!')), 5000);
});

const promise2 = new Promise(function(resolve) {
  document.addEventListener('mousedown', (event) => {
    console.log(event.button);

    if (event.button === 0 || event.button === 2) {
      resolve('Second promise - Hi, Mate!');
    }
  });
});

const promise3 = new Promise(function(resolve) {
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      leftButtonDown = true;
    }

    if (event.button === 2) {
      rightButtonDown = true;
    }

    if (leftButtonDown && rightButtonDown) {
      resolve('Third promise - Hi, Mate!');
    }
  });
});

document.addEventListener('mouseup', (event) => {
  if (event.button === 0) {
    leftButtonDown = false;
  }

  if (event.button === 2) {
    rightButtonDown = false;
  }
});

promise1
  .then(
    result => console.log(result),
    error => console.log(error),
  );

promise2
  .then(
    result => console.log(result),
  );

promise3
  .then(
    result => console.log(result),
  );
