'use strict';

const body = document.querySelector('body');

function getSuccessMessage(message) {
  return body.insertAdjacentHTML(
    'beforeend',
    `<div data-q="notification" class="message">${message}</div>`
  );
}

function getErrorMessage(message) {
  return body.insertAdjacentHTML(
    'beforeend',
    `<div data-q="notification" class="
     message message--warning">${message.message}</div>`
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
    e.preventDefault(); // prevent right-click popup menu
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(getSuccessMessage).catch(getErrorMessage);
secondPromise.then(getSuccessMessage).catch(getErrorMessage);
thirdPromise.then(getSuccessMessage).catch(getErrorMessage);
