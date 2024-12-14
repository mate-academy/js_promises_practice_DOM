'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  let isResolved = false;

  function handleEvent() {
    if (!isResolved) {
      isResolved = true;
      resolve('Second promise was resolved');
    }
  }

  document.addEventListener('click', handleEvent);
  document.addEventListener('contextmenu', handleEvent);
});

const thirdPromise = new Promise((resolve) => {
  let hasLeftClick = false;
  let hasRightClick = false;
  let isResolved = false;

  function checkResolution() {
    if (hasLeftClick && hasRightClick && !isResolved) {
      isResolved = true;
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    hasLeftClick = true;
    checkResolution();
  });

  document.addEventListener('contextmenu', () => {
    hasRightClick = true;
    checkResolution();
  });
});

firstPromise
  .then((message) => showMessage(message, 'success'))
  .catch((error) => showMessage(error.message, 'error'));

secondPromise.then((message) => showMessage(message, 'success'));
thirdPromise.then((message) => showMessage(message, 'success'));

function showMessage(text, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.textContent = text;

  const body = document.querySelector('body');

  body.appendChild(div);
}
