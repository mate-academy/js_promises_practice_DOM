'use strict';

const body = document.querySelector('body');

function addMessage(className, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = className;
  div.innerText = message;
  body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise
  .then(() => {
    addMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    addMessage('error', 'First promise was rejected');
  });

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', () => {
    resolve();
  });
});

secondPromise
  .then(() => {
    addMessage('success', 'Second promise was resolved');
  });

const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  body.addEventListener('mousedown', (eventObj) => {
    if (eventObj.button === 0) {
      left = true;
    }

    if (eventObj.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(() => {
    addMessage('success', 'Third promise was resolved');
  });
