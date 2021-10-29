'use strict';

const body = document.querySelector('body');
const promise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise.then((message) => {
  body.insertAdjacentHTML('afterbegin', `
  <div data-qa="notification" class="success">${message}</div>`);
}).catch((message) => {
  body.insertAdjacentHTML('afterbegin', `
  <div data-qa="notification" class="warning success">${message}</div>`);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 1) {
      return;
    }

    resolve('Second promise was resolved');
  });
});

promise2.then((text) => {
  body.insertAdjacentHTML('afterbegin', `
  <div data-qa="notification" class="success">${text}</div>`);
});

const promise3 = new Promise((resolve) => {
  let button1 = false;
  let button2 = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      button1 = true;
    }

    if (e.button === 2) {
      button2 = true;
    }

    if (button1 && button2) {
      resolve('Third promise was resolved');
    }
  });
});

promise3.then((text) => {
  body.insertAdjacentHTML('afterbegin', `
  <div data-qa="notification" class="success">${text}</div>`);
});
