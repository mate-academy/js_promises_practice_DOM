/* eslint-disable prefer-promise-reject-errors */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

function createNotification(text, success = true) {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('data-qa', 'notification');

  if (success) {
    newDiv.classList.add('success');
  } else {
    newDiv.classList.add('error');
  }

  newDiv.textContent = text;

  document.body.append(newDiv);
}

firstPromise
  .then((text) => createNotification(text))
  .catch((text) => createNotification(text, false));

secondPromise
  .then((text) => createNotification(text))
  .catch((text) => createNotification(text, false));

thirdPromise
  .then((text) => createNotification(text))
  .catch((text) => createNotification(text, false));
