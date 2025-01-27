/* eslint-disable prefer-promise-reject-errors */
'use strict';

const logo = document.querySelector('.logo');
const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);

  logo.addEventListener('click', () => {
    clearTimeout(timeoutId);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 2 || e.button === 0) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = function (resolve) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = resolve;
  body.appendChild(div);
};

const errorHandler = function (reject) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = reject;
  body.appendChild(div);
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
