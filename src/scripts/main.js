'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise(function(resolve, reject) {
  document.addEventListener('mouseup', e => {
    e.button === 0
      ? resolve('First promise was resolved')
      : setTimeout(() => reject(new Error('Promise was rejected!')), 3000);
  });
});

firstPromise
  .then(() => {
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification success">First promise was resolved</div>
    `);
  })
  .catch(() => {
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification warning">Promise was rejected!</div>
    `);
  });

const secondPromise = new Promise(function(resolve, reject) {
  document.addEventListener('mouseup', e => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then(() => {
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification success">Second promise was resolved</div>
    `);
  });

const thirdPromise1 = new Promise(function(resolve, reject) {
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
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification success">Third promise was resolved</div>
    `);
  });
