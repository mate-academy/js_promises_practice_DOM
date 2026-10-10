'use strict';

const body = document.body;

let rightClick = false;
let leftClick = false;

let resolveFirst;
let resolveSecond;
let resolveThird;
let timerId;

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    leftClick = true;
    resolveFirst('First promise was resolved');
    resolveSecond('Second promise was resolved');
    clearTimeout(timerId);
  }

  if (e.button === 2) {
    resolveSecond('Second promise was resolved');
    rightClick = true;
  }

  if (rightClick && leftClick) {
    resolveThird('Third promise was resolved');
  }
});

const firstPromise = new Promise((resolve, reject) => {
  resolveFirst = resolve;

  timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  resolveSecond = resolve;
});

const thirdPromise = new Promise((resolve) => {
  resolveThird = resolve;
});

const promises = [firstPromise, secondPromise, thirdPromise];

promises.forEach((promise) => {
  promise
    .then((message) => {
      const block = document.createElement('div');

      block.setAttribute('data-qa', 'notification');
      block.classList.add('success');
      block.textContent = message;
      body.append(block);
    })
    .catch((error) => {
      const block = document.createElement('div');

      block.setAttribute('data-qa', 'notification');
      block.classList.add('error');
      block.textContent = error.message;
      body.append(block);
    });
});
