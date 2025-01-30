'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((value) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">${value}</div>`,
    );
  })
  .catch((error) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">${error}</div>`,
    );
  });

secondPromise
  .then((value) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">${value}</div>`,
    );
  })
  .catch((error) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">${error}</div>`,
    );
  });

thirdPromise
  .then((value) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">${value}</div>`,
    );
  })
  .catch((error) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">${error}</div>`,
    );
  });
