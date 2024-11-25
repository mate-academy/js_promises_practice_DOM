/* eslint-disable function-paren-newline */
'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeout);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftButtonClicked = false;
  let rightButtonClicked = false;

  document.addEventListener('click', () => {
    leftButtonClicked = true;

    if (leftButtonClicked && rightButtonClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightButtonClicked = true;

    if (leftButtonClicked && rightButtonClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function createMessage(type, text) {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('data-qa', 'notification');
  newDiv.classList.add(type);
  newDiv.textContent = text;

  document.body.appendChild(newDiv);
}

firstPromise
  .then(() => createMessage('success', 'First promise was resolved'))
  .catch((error) => createMessage('error', error.message));

secondPromise.then(() =>
  createMessage('success', 'Second promise was resolved'),
);

thirdPromise.then(() => createMessage('success', 'Third promise was resolved'));
