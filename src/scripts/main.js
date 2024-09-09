/* eslint-disable prefer-promise-reject-errors */
'use strict';

const arrOfPromises = [];

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  ['click', 'contextmenu'].forEach((type) => {
    document.addEventListener(type, (_event) => {
      resolve('Second promise was resolved');
    });
  });
});

const promise3 = new Promise((resolve, reject) => {
  const leftClick = 'click';
  const rightClick = 'contextmenu';
  const arrOfClicks = [];

  [leftClick, rightClick].forEach((type) => {
    document.addEventListener(type, (_event) => {
      arrOfClicks.push(type);

      if (arrOfClicks.includes(leftClick) && arrOfClicks.includes(rightClick)) {
        resolve('Third promise was resolved');
      }
    });
  });
});

arrOfPromises.push(promise1, promise2, promise3);

arrOfPromises.forEach((promise) => {
  promise.then(
    (success) => {
      document.body.insertAdjacentHTML(
        'beforeend',
        `<div data-qa="notification" class="success">${success}</div>`,
      );
    },
    (error) => {
      document.body.insertAdjacentHTML(
        'beforeend',
        `<div data-qa="notification" class="error">${error}</div>`,
      );
    },
  );
});
