'use strict';

const body = document.body;
let leftClick = false;
let rightClick = false;

function showMessage(message, className) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.innerText = message;
  div.classList.add(className);

  body.append(div);
}

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    leftClick = true;

    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    leftClick = true;
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', () => {
    rightClick = true;
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  body.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then((result) => {
    showMessage(result, 'success');
  }, (error) => {
    showMessage(error, 'warning');
  });

promise2
  .then((result) => {
    showMessage(result, 'success');
  });

promise3
  .then((result) => {
    showMessage(result, 'success');
  });
