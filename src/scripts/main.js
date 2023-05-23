'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    };
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let clickLeft = false;
  let clickRight = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clickLeft = true;
    }

    if (e.button === 2) {
      clickRight = true;
    }

    if (clickLeft && clickRight) {
      resolve('Third promise was resolved');
    }
  });
});

function handlerMessage(type, text) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notofication" class="${type}">${text}</div>
  `);
};

const success = (message) => {
  handlerMessage('success', message);
};

const warn = (message) => {
  handlerMessage('warning', message);
};

firstPromise
  .then(success)
  .catch(warn);

secondPromise.then(success);

thirdPromise.then(success);
