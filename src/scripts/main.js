'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', () => {
    leftClicked = true;

    if (rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = (successMessage) => {
  body.insertAdjacentHTML(
    'beforeend',
    `<div class="success" data-qa="notification">${successMessage}</div>`,
  );
};

const errorHandler = (errorMessage) => {
  body.insertAdjacentHTML(
    'beforeend',
    `<div class="error" data-qa="notification">${errorMessage}</div>`,
  );
};

firstPromise.then(successHandler).catch(errorHandler);

secondPromise.then(successHandler);

thirdPromise.then(successHandler);
