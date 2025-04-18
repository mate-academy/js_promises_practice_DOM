'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timeout);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    } else if (e.buttons === 3) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

function notification(message, st) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  div.classList.add(st === 'success' ? 'success' : 'error');
  document.body.appendChild(div);
}

firstPromise
  .then((message) => notification(message, 'success'))
  .catch((error) => notification(error, 'error'));

secondPromise.then((message) => notification(message, 'success'));

thirdPromise.then((message) => notification(message, 'success'));
