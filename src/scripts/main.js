'use strict';

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => resolve());
});
const rightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => resolve());
});

const firstPromise = new Promise((resolve, reject) => {
  leftClick.then(() => resolve('First promise was resolved'));

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  leftClick.then(() => resolve('Second promise was resolved'));
  rightClick.then(() => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise((resolve) => {
  leftClick.then(() =>
    rightClick.then(() =>
      resolve('Third promise was resolved')));
});

function handler(className) {
  return function(message) {
    document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${className}">
      ${message}
    </div>
    `);
  };
}

firstPromise
  .then(handler('success'))
  .catch(handler('warning'));

secondPromise
  .then(handler('success'))
  .catch(handler('warning'));

thirdPromise
  .then(handler('success'))
  .catch(handler('warning'));
