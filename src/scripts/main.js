'use strict';

// const logo = document.querySelector('.logo');
let leftClick = false;
let rightClick = false;

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  const handler = function (e) {
    if (e.button === 0) {
      leftClick = true;
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', handler);

  setTimeout(() => {
    if (!leftClick) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});
const secondPromise = new Promise((resolve, reject) => {
  const handler = function (e) {
    leftClick = e.button === 0 ? true : leftClick;
    rightClick = e.button === 2 ? true : rightClick;

    if (leftClick && rightClick) {
      document.dispatchEvent(new Event('right-left-clicked'));
      leftClick = false;
      rightClick = false;
    }

    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mouseup', handler);
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('right-left-clicked', () => {
    resolve('Third promise was resolved');
  });
});

const error = (value) => {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="error" data-qa="notification">${value}</div>`,
  );
};
const success = (value) => {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="success" data-qa="notification">${value}</div>`,
  );
};

firstPromise.then(success).catch(error);
secondPromise.then(success);
thirdPromise.then(success);
