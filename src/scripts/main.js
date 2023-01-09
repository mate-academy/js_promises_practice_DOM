'use strict';

const body = document.querySelector('body');

const promise = (resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject();
  }, 3000);
};

const clickLeft = (resolve) => {
  body.addEventListener('click', () => {
    resolve();
  });
};

const clickRight = (resolve) => {
  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
};

const promiseLeftClick = new Promise(clickLeft);
const promiseRightClick = new Promise(clickRight);

const promise1 = new Promise(promise);

;

const promise2 = Promise.race([promiseLeftClick, promiseRightClick]);
const promise3 = Promise.all([promiseLeftClick, promiseRightClick]);

promise1
  .then(result => {
    body.insertAdjacentHTML('beforebegin', `
      <div class="success" data-qa="notification">
        First promise was resolved
      <div>
    `);
  })
  .catch(result => {
    body.insertAdjacentHTML('beforebegin', `
      <div class="error" data-qa="notification">
        First promise was rejected
      <div>`
    );
  });

promise2
  .then(result => {
    body.insertAdjacentHTML('beforebegin', `
      <div class="success" data-qa="notification">
        Second promise was resolved
      <div>
    `);
  });

promise3
  .then(result => {
    body.insertAdjacentHTML('beforebegin', `
      <div class="success" data-qa="notification">
        Third promise was resolved
      <div>
    `);
  });
