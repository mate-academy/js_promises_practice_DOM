'use strict';

function typeMessage(message, type) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="${type}" data-qa="notification">${message}</div>`,
  );
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (rightClick & leftClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightClick = true;

    if (rightClick & leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    typeMessage(message, 'success');
  })
  .catch((error) => {
    typeMessage(error.message, 'error');
  });

secondPromise.then((message) => {
  typeMessage(message, 'success');
});

thirdPromise.then((message) => {
  typeMessage(message, 'success');
});
