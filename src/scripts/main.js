'use strict';

let right;
let left;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      setTimeout(() => {
        resolve();
      }, 3000);
      left = true;
    }
  });
});

firstPromise.then(() => {
  const box1 = document.createElement('div');

  document.body.appendChild(box1);
  box1.textContent = 'First promise was resolved';
});

firstPromise.catch(() => {
  const box1 = document.createElement('div');

  document.body.appendChild(box1);
  box1.textContent = 'First promise was rejected';
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      resolve();
    }

    if (click.button === 2) {
      resolve();
      right = true;
    }
  });
});

secondPromise.then(() => {
  const box1 = document.createElement('div');

  document.body.appendChild(box1);
  box1.textContent = 'Second promise was resolved';
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (click) => {
    if (left === true && right === true) {
      resolve();
    }
  });
});

thirdPromise.then(() => {
  const box1 = document.createElement('div');

  document.body.appendChild(box1);
  box1.textContent = 'Third promise was resolved';
});
