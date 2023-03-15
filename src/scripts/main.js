'use strict';

let right;
let left;

function display1(order) {
  const box1 = document.createElement('div');

  document.body.appendChild(box1);
  box1.textContent = `${order} promise was resolved`;
}

function display2(order) {
  const box2 = document.createElement('div');

  document.body.appendChild(box2);
  box2.textContent = `${order} promise was rejected`;
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
  display1('First');
});

firstPromise.catch(() => {
  display2('First');
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
  display1('Second');
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (click) => {
    if (left === true && right === true) {
      resolve();
    }
  });
});

thirdPromise.then(() => {
  display1('Third');
});
