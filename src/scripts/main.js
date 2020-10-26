/* eslint-disable no-console */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Done');
  });

  setTimeout(() => {
    reject(new Error('To late...'));
  }, 5000);
});

firstPromise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', e => {
    if (e.which === 1) {
      resolve('left click');
    }
  });

  document.addEventListener('contextmenu', e => {
    if (e.which === 3) {
      reject(new Error('right click'));
    }
  });
});

secondPromise
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.warn(error);
  });

const thirdPromise = new Promise((resolve) => {
  let right = false;
  let left = false;

  document.addEventListener('mousedown', e => {
    if (e.which === 1) {
      left = true;
    }

    if (e.which === 3) {
      right = true;
    }

    if (right && left) {
      resolve('clicked on 2 buttons');
    }
  });
});

thirdPromise.then(result => {
  console.log(result);
});
