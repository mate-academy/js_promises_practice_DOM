'use strict';

let right;
let left;

function display(order) {
  const box1 = document.createElement('div');

  document.body.appendChild(box1);
  box1.textContent = `${order}`;

  order.split(' ').includes('resolved')
    ? box1.className += 'success'
    : box1.className += 'warning';
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      resolve('First promise was resolved');
      left = true;
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise.then((message) => {
  display(message);
});

firstPromise.catch((message) => {
  display(message);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      resolve('Second promise was resolved');
    }

    if (click.button === 2) {
      resolve('Second promise was resolved');
      right = true;
    }
  });
});

secondPromise.then((message) => {
  display(message);
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (click) => {
    if (left === true && right === true) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  display(message);
});
