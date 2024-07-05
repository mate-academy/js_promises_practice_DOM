'use strict';

const logo = document.querySelector('.logo');

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function firstPromise() {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);

    document.addEventListener('click', function handleClick(e) {
      if (e.button === 0) {
        resolve('First promise was resolved');
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClick);
      }
    });
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    document.addEventListener('mousedown', function handleMouseDown(e) {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
        document.removeEventListener('mousedown', handleMouseDown);
      }
    });
  });
}

function thirdPromise() {
  let leftClick = false;
  let rightClick = false;

  return new Promise((resolve) => {
    document.addEventListener('mousedown', function handleMouseDown(e) {
      if (e.button === 0) {
        leftClick = true;
      } else if (e.button === 2) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
        document.removeEventListener('mousedown', handleMouseDown);
      }
    });
  });
}

function handleSuccess(message) {
  logo.insertAdjacentHTML(
    'afterend',
    `<div data-qa="notification" class="success">${message}</div>`,
  );
}

function handleError(error) {
  logo.insertAdjacentHTML(
    'afterend',
    `<div data-qa="notification" class="error">${error.message}</div>`,
  );
}

firstPromise().then(handleSuccess).catch(handleError);

secondPromise().then(handleSuccess);

thirdPromise().then(handleSuccess);
