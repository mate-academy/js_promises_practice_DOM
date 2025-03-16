'use strict';

const div = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');
const body = document.querySelector('body');
let left = 0;
let right = 0;

div.dataset.qa = 'notification';
div2.dataset.qa = 'notification';
div3.dataset.qa = 'notification';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
    div.classList = 'success';
    div.textContent = 'First promise was resolved';
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    } else if (e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = 1;
    }

    if (e.button === 2) {
      right = 1;
    }

    if (left + right === 2) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then((message) => {
  div.classList = 'success';
  div.textContent = message;
},
(err) => {
  div.classList = 'error';
  div.textContent = err;
},
);

secondPromise.then((message) => {
  div2.classList = 'success';
  div2.textContent = message;
});

thirdPromise.then((message) => {
  div3.classList = 'success';
  div3.textContent = message;
});

body.append(div);
body.append(div2);
body.append(div3);
