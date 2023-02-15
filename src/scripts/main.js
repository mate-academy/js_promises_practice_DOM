'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  body.addEventListener('click', ev => {
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
    switch (ev.button) {
      case 0:
        leftClick = true;
        break;
      case 2:
        rightClick = true;
        break;
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
  .catch(() => {
    createElement('warning', 'First promise was rejected');
  });

secondPromise
  .then(message => {
    createElement('success', message);
  });

thirdPromise
  .then(message => {
    createElement('success', message);
  });
