'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let isLeftClick = false;
let isRightClick = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      isLeftClick = true;
    }

    if (e.button === 2) {
      isRightClick = true;
    }

    if (isLeftClick && isRightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((success) => {
    const block = document.createElement('div');

    block.dataset.qa = 'notification';
    block.classList.add('success');
    block.textContent = success;

    document.body.append(block);
  })
  .catch((error) => {
    const block = document.createElement('div');

    block.dataset.qa = 'notification';
    block.classList.add('error');
    block.textContent = error.message;

    document.body.append(block);
  });

secondPromise.then((success) => {
  const block = document.createElement('div');

  block.dataset.qa = 'notification';
  block.classList.add('success');
  block.textContent = success;

  document.body.append(block);
});

thirdPromise.then((success) => {
  const block = document.createElement('div');

  block.dataset.qa = 'notification';
  block.classList.add('success');
  block.textContent = success;

  document.body.append(block);
});
