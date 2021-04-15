'use strict';

function createMessageBlock(classes, message) {
  document.body.insertAdjacentHTML('beforebegin', `
  <div data-qa="notification" class="${classes}">
      ${message}
  </div>`);
};

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('Error'));
  }, 3000);
});

firstPromise
  .then(() => {
    createMessageBlock('message success', 'First promise was resolved');
  })
  .catch(() => {
    createMessageBlock('message warning', 'First promise was rejected');
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.which === 1 || e.which === 3) {
      resolve();
    }
  });
});

secondPromise
  .then(() => {
    createMessageBlock('message success success__second',
      'Second promise was resolved');
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.which === 1) {
      leftClick = true;
    }

    if (e.which === 3) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => {
    createMessageBlock('message success success__third',
      'Third promise was resolved');
  });
