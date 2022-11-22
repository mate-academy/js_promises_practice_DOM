'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});
const secondPromise = new Promise(resolve => {
  const clickHandler = () => resolve('Second promise was resolved');

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});
const leftClick = new Promise(resolve => {
  document.addEventListener('click', () => resolve());
});
const rightClick = new Promise(resolve => {
  document.addEventListener('contextmenu', () => resolve());
});
const thirdPromise = new Promise(resolve => {
  Promise
    .all([leftClick, rightClick])
    .then(() => resolve('Third promise was resolved'));
});
const appendMessage = (message, type) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${type}" data-qa="notification">
      ${message}
    </div>
  `);
};

firstPromise
  .then(message => appendMessage(message, 'success'))
  .catch(message => appendMessage(message, 'warning'));

secondPromise.then(message => appendMessage(message, 'success'));

thirdPromise.then(message => appendMessage(message, 'success'));
