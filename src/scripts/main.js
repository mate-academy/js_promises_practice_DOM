'use strict';

const body = document.querySelector('body');
const div = document.createElement('div');

div.dataset.qa = 'notification';

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((result) => {
    addNotification(result, 'succes');
  })

  .catch((result) => {
    addNotification(result, 'warning');
  });

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((result) => {
    addNotification(result, 'succes');
  });

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rigthClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rigthClick = true;

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((result) => {
    addNotification(result, 'succes');
  });

function addNotification(text, actionResult) {
  div.textContent = text;
  div.className = actionResult;
  body.append(div.cloneNode(true));
}
