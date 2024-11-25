'use strict';

const body = document.querySelector('body');

function message(className, title) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${className}">${title}</div>
  `);
}

const successHandler = function(promise) {
  return message('success', `${promise}`);
};

const errorHandler = function(promise) {
  return message('error', `${promise}`);
};

const firstPromise = new Promise((resolve, reject) => {
  let timer = true;

  document.addEventListener('click', e => {
    timer = false;

    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    if (timer) {
      reject(new Error('First promise was rejected!'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved!');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved!');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClicked = false;
  let leftClicked = false;

  document.addEventListener('click', () => {
    if (rightClicked) {
      resolve('Third promise was resolved!');
    }

    leftClicked = true;
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (leftClicked) {
      resolve('Third promise was resolved!');
    }

    rightClicked = true;
  });
});

firstPromise.then(successHandler, errorHandler);
secondPromise.then(successHandler, errorHandler);
thirdPromise.then(successHandler, errorHandler);
