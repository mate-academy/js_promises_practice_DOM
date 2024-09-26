'use strict';

const firstPromice = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromice = new Promise((resolve) => {
  const resolveFunction = function(e) {
    e.preventDefault();
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', resolveFunction);
  document.addEventListener('contextmenu', resolveFunction);
});

const clickPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const contextmenuPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromice = new Promise((resolve) => {
  Promise.all([clickPromise, contextmenuPromise]).then(() => {
    resolve('Third promise was resolved');
  });
});

const createDiv = function(className, message) {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${className}">${message}</div>
`);
};

const successHandler = function(value) {
  createDiv('success', value);
};

const errorHandler = function(value) {
  createDiv('warning', value);
};

firstPromice.then(successHandler, errorHandler);
secondPromice.then(successHandler, errorHandler);
thirdPromice.then(successHandler, errorHandler);
