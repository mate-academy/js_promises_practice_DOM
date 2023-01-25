'use strict';

const body = document.querySelector('body');

function printMessage(stat, message) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification ${stat}">${message}</div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', e => {
    e.button === 0
      ? resolve('First promise was resolved')
      : setTimeout(() => reject(new Error('Promise was rejected!')), 3000);
  });
});

firstPromise
  .then(() => {
    printMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    printMessage('warning', 'Promise was rejected!');
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', e => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then(() => {
    printMessage('success', 'Second promise was resolved');
  });

const thirdPromise1 = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', e => {
    if (e.button === 0) {
      resolve('Third promise was resolved');
    }
  });
});

const thirdPromise2 = new Promise(function(resolve, reject) {
  document.addEventListener('mouseup', e => {
    if (e.button === 2) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise1
  .then(() => thirdPromise2)
  .then(() => {
    printMessage('success', 'Third promise was resolved');
  });
