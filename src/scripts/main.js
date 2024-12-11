'use strict';

function createDiv(divMessage, divStatus) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = divStatus;
  div.innerText = divMessage;

  document.body.appendChild(div);
}

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});
const thirdPromise = new Promise((resolve, reject) => {
  let hasLeftClick = false;
  let hasRightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      hasLeftClick = true;
    }

    if (e.button === 2) {
      hasRightClick = true;
    }

    if (hasLeftClick && hasRightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    createDiv(message, 'success');
  })
  .catch((error) => {
    createDiv(error.message, 'error');
  });

secondPromise
  .then((message) => {
    createDiv(message, 'success');
  })
  .catch((error) => {
    createDiv(error.message, 'error');
  });

thirdPromise
  .then((message) => {
    createDiv(message, 'success');
  })
  .catch((error) => {
    createDiv(error.message, 'error');
  });
