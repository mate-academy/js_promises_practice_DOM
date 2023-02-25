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
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const leftClick = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClick = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  Promise.all([leftClick, rightClick]).then(() => {
    resolve('Third promise was resolved');
  });
});

function createDiv(className, data) {
  const divEl = document.createElement('div');

  divEl.classList.add(className);
  divEl.innerHTML = data;
  divEl.setAttribute('data-qa', 'notification');

  document.body.append(divEl);
};

function handleSuccess(result) {
  createDiv('success', result);
};

function handleError(error) {
  createDiv('warning', error);
};

firstPromise.then(handleSuccess, handleError);
secondPromise.then(handleSuccess, handleError);
thirdPromise.then(handleSuccess, handleError);
