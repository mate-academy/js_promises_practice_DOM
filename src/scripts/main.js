'use strict';

const body = document.querySelector('body');
const createElement = function (className, text) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.className = className;

  div.textContent = text;

  body.append(div);
};
let isClicked = false;
let leftClick = false;
const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    isClicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!isClicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    leftClick = true;
    resolve();
  });

  body.addEventListener('contextmenu', () => {
    resolve();
  });
});

firstPromise
  .then(() => {
    createElement('success', 'First promise was resolved');
  })
  .catch(() => {
    createElement('error', 'First promise was rejected');
  });

secondPromise
  .then(() => {
    createElement('success', 'Second promise was resolved');
  })
  .catch(() => {
    createElement('error', 'Second promise was rejected');
  });

thirdPromise
  .then(() => {
    if (leftClick) {
      body.addEventListener('contextmenu', () => {
        createElement('success', 'Third promise was resolved');
      });
    } else {
      body.addEventListener('click', () => {
        createElement('success', 'Third promise was resolved');
      });
    }
  })
  .catch(() => {
    createElement('error', 'Third promise was rejected');
  });
