'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2 || ev.button === 1) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rigthClick = false;

  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rigthClick = true;
    }

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });
});

function addMessage(type, text) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${type}" data-qa="notification">${text}</div>
  `);
}

firstPromise
  .then(message => addMessage('success', message))
  .catch(message => addMessage('warning', message));

secondPromise.then(message => addMessage('success', message));

thirdPromise.then(message => addMessage('success', message));
