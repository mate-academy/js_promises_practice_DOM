/* eslint-disable prefer-promise-reject-errors */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject('First promise was rejected'), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick, rightClick;

  window.addEventListener('mousedown', (e) => {
    leftClick = e.button === 0 || leftClick;
    rightClick = e.button === 2 || rightClick;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = (message) => {
  const container = document.createElement('div');

  container.setAttribute('data-qa', 'notification');
  container.classList.add('success');
  container.textContent = message;
  document.body.append(container);
};

const errorHandler = (message) => {
  const container = document.createElement('div');

  container.setAttribute('data-qa', 'notification');
  container.classList.add('error');
  container.textContent = message;
  document.body.append(container);
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
