'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;
    isClicked();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    isClicked();
  });

  function isClicked() {
    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  }
});

firstPromise
  .then(completed => {
    createNotofication('success', completed);
  })
  .catch(cencel => {
    createNotofication('warning', cencel);
  });

secondPromise.then((completed) => {
  createNotofication('success', completed);
});

thirdPromise.then((completed) => {
  createNotofication('success', completed);
});

function createNotofication(type, message) {
  const body = document.querySelector('body');

  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class='${type}'>${message}</div>`
  );
};
