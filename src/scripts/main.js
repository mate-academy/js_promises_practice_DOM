'use strict';

const doc = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  const click = doc.addEventListener('click', (e) =>
    resolve('First promise was resolved'));

  setTimeout(() => {
    if (!click) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

promise1
  .then(result => {
    doc.insertAdjacentHTML('beforeend',
      `<div data-qa="notification" class="success">
      First promise was resolved</div>`);
  })

  .catch(er => {
    doc.insertAdjacentHTML('beforeend',
      `<div data-qa="notification" class="warning">
      First promise was rejected</div>`);
  });

const promise2 = new Promise((resolve) => {
  doc.addEventListener('click', () =>
    resolve('First promise was resolved'));

  doc.addEventListener('contextmenu', () =>
    resolve('First promise was resolved'));
});

promise2
  .then(result => doc.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="success">
    Second promise was resolved</div>`))

  .catch(er => doc.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="warning">
    Second promise was rejected</div>`));

let leftClick = false;
let rightClick = false;

const promise3 = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    leftClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });

  doc.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

promise3
  .then(result => doc.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="success">
    Third promise was resolved</div>`))

  .catch(er => doc.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="warning">
    Third promise was rejected</div>`));
