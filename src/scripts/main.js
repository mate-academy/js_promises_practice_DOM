'use strict';

const getElement = ([message, className]) => {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.innerText = message;
  element.className = className;

  return document.body.appendChild(element);
};

let leftClick = false;
let rightClick = false;

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick) {
      resolve(['First promise was resolved', 'success']);
    }
  });

  if (!leftClick) {
    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(['First promise was rejected', 'error']);
    }, 3000);
  }
});

const promise2 = new Promise((resolve) => {
  const success = (e) => {
    e.preventDefault();
    resolve(['Second promise was resolved', 'success']);
  };

  document.addEventListener('click', success);

  document.addEventListener('contextmenu', success);
});

const promise3 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClick = true;

    if (rightClick && leftClick) {
      resolve(['Third promise was resolved', 'success']);
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (rightClick && leftClick) {
      resolve(['Third promise was resolved', 'success']);
    }
  });
});

promise1.then(getElement).catch(getElement);
promise2.then(getElement);
promise3.then(getElement);
