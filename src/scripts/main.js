'use strict';

let leftClick = false;
let rightClick = false;

document.body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function addMessage(type, message) {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${type}">${message}</div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('mousedown', (ev) => {
    if (ev.button === 2) {
      rightClick = true;
    }

    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((text) => {
    addMessage('success', text);
  })
  .catch((text) => {
    addMessage('error', text);
  });

secondPromise
  .then((text) => {
    addMessage('success', text);
  });

thirdPromise
  .then((text) => {
    addMessage('success', text);
  });
