'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button >= 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick;
  let leftClick;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function createResultBlock(className, message) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${className}">
      <p>${message}</p>
    </div>
  `);
};

firstPromise
  .then((result) => {
    createResultBlock('success', result);
  })
  .catch((result) => {
    createResultBlock('warning', result);
  });

secondPromise.then((result) => {
  createResultBlock('success', result);
});

thirdPromise.then((result) => {
  createResultBlock('success', result);
});
