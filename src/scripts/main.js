'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  body.addEventListener('mousedown', ev => {
    if (ev.button === 0 || ev.button === 2) {
      ev.preventDefault();

      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(resolve => {
  let leftClick;
  let rightClick;

  body.addEventListener('mousedown', ev => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function createElement(result, text) {
  body.insertAdjacentHTML('beforeend',
    `<div class=${result} data-qa="notification">${text}</div>`);
}

firstPromise
  .then(message => {
    createElement('success', message);
  })
  .catch(message => {
    createElement('warning', message);
  });

secondPromise
  .then(message => {
    createElement('success', message);
  });

thirdPromise
  .then(message => {
    createElement('success', message);
  });
