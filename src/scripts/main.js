'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    };
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    };
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was rejected');
    }
  });
});

firstPromise
  .then(text => message(text, 'success'))
  .catch(text => message(text, 'error'));

secondPromise
  .then(text => message(text, 'success'));

thirdPromise
  .then(text => message(text, 'success'));

function message(text, result) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="message ${result}">
      ${text}</div>`);
}
