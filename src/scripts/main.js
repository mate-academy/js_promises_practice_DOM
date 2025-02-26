'use strict';
/* eslint-disable */

const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');
    div.classList.add('success');
    div.textContent = message;
    document.body.appendChild(div);
  })
  .catch((message) => {
    const div = document.createElement('div');
    div.classList.add('error');
    div.textContent = message;
    document.body.appendChild(div);
  });

const secondPromise = new Promise((resolve) => {
  const handleClick = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleClick);

  document.addEventListener('contextmenu', handleClick);
});

secondPromise.then((message) => {
  const div = document.createElement('div');
  div.classList.add('success');
  div.textContent = message;
  document.body.appendChild(div);
});

let rightClick = false;
let leftClick = false;

const thirdPromise = new Promise((resolve) => {
  const handleLeftClick = () => {
    leftClick = true;
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  const handleRightClick = () => {
    rightClick = true;
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});
