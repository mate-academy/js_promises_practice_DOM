'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => resolve('First promise was resolved'));
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
  body.addEventListener('click', () => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
      setTimeout(() => (leftClick = false), 3000);
    }

    if (e.button === 2) {
      e.preventDefault();
      rightClick = true;
      setTimeout(() => (rightClick = false), 3000);
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      leftClick = false;
      rightClick = false;
    }
  });
});

const createDiv = (message, className, dataQA) => {
  const div = document.createElement('div');

  div.classList.add(className);
  div.setAttribute('data-qa', dataQA);
  div.textContent = message;
  body.appendChild(div);
};

firstPromise
  .then((message) => createDiv(message, 'success', 'notification'))
  .catch((error) => createDiv(error, 'error', 'notification'));

secondPromise.then((message) => createDiv(message, 'success', 'notification'));

thirdPromise.then((message) => createDiv(message, 'success', 'notification'));
