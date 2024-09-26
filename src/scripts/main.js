'use strict';

document.body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

let rightClick = false;
let leftClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((value) => {
    createMessage(value, 'success');
  })
  .catch((value) => {
    createMessage(value, 'warning');
  });

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      rightClick = true;
    }

    if (e.button === 0) {
      leftClick = true;
    }
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((value) => {
    createMessage(value, 'success');
  });

const thirdPromise = new Promise((resolve) => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((value) => {
    createMessage(value, 'success');
  });

function createMessage(value, type) {
  const block = document.createElement('div');

  block.setAttribute('data-qa', 'notification');
  block.classList.add(type);
  block.textContent = value;
  document.body.append(block);
};
