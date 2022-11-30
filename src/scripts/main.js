'use strict';

const body = document.querySelector('body');

function getMessage(message, typeOfMessage) {
  const insertClass = typeOfMessage === 'warning' ? ' message--warning' : '';

  return body.insertAdjacentHTML(
    'beforeend',
    `<div data-q="notification" class="message${insertClass}">${message}</div>`
  );
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => resolve('First promise was resolved'));

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('contextmenu', () =>
    resolve('Second promise was resolved')
  );

  body.addEventListener('click', () => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => getMessage(message))
  .catch((error) => getMessage(error, 'warning'));

secondPromise
  .then((message) => getMessage(message))
  .catch((error) => getMessage(error, 'warning'));

thirdPromise
  .then((message) => getMessage(message))
  .catch((error) => getMessage(error, 'warning'));
