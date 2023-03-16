'use strict';

let right;
let left;

function display(order) {
  const box1 = document.createElement('div');

  document.body.appendChild(box1);
  box1.textContent = `${order}`;

  order.split(' ').includes('resolved')
    ? box1.className += 'succes'
    : box1.className += 'warning';
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      resolve();
      left = true;
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise.then(() => {
  display('First promise was resolved');
});

firstPromise.catch(() => {
  display('First promise was rejected');
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
  display('Second promise was resolved');
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (click) => {
    if (left === true && right === true) {
      resolve();
    }
  });
});

thirdPromise.then(() => {
  display('Third promise was resolved');
});
