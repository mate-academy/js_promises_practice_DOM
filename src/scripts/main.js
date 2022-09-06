'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', e => {
    e.preventDefault();

    if (e.button !== 1) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', e => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftButtonClicked = false;
  let rightButtonClicked = false;

  document.addEventListener('click', e => {
    if (e.button === 0) {
      leftButtonClicked = true;
    }

    if (leftButtonClicked && rightButtonClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightButtonClicked = true;

    if (leftButtonClicked && rightButtonClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function success(result) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">${result}</div>
  `);
};

function error(warning) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">${warning.message}</div>
  `);
};

firstPromise.then(success, error);
secondPromise.then(success);
thirdPromise.then(success);
