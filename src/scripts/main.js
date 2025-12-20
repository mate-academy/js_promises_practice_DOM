'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const body = document.querySelector('body');

  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  body.addEventListener('click', (e) => {
    clearTimeout(timerId);
    resolve('First promise was resolved');
  });
});

firstPromise
  .then((message) => {
    const body = document.querySelector('body');
    const messageBlock = document.createElement('div');

    messageBlock.dataset.qa = 'notification';
    messageBlock.textContent = message;
    messageBlock.classList.add('success');
    body.appendChild(messageBlock);
  })
  .catch((error) => {
    const body = document.querySelector('body');
    const messageBlock = document.createElement('div');

    messageBlock.dataset.qa = 'notification';
    messageBlock.textContent = error.message;
    messageBlock.classList.add('error');
    body.appendChild(messageBlock);
  });

// =====================================================================
const secondPromise = new Promise((resolve, reject) => {
  const body = document.querySelector('body');

  body.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => {
  const body = document.querySelector('body');
  const messageBlock = document.createElement('div');

  messageBlock.dataset.qa = 'notification';
  messageBlock.textContent = message;
  messageBlock.classList.add('success');
  body.appendChild(messageBlock);
});

// =============================================================
const thirdPromise = new Promise((resolve, reject) => {
  const body = document.querySelector('body');
  let isLeftButton = false;
  let isRightButton = false;

  body.addEventListener('mousedown', (e) => {
    e.preventDefault();

    const button = e.button;

    if (button === 0) {
      isLeftButton = true;
    } else if (button === 2) {
      isRightButton = true;
    }

    if (isLeftButton && isRightButton) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  const body = document.querySelector('body');
  const messageBlock = document.createElement('div');

  messageBlock.dataset.qa = 'notification';
  messageBlock.textContent = message;
  messageBlock.classList.add('success');
  body.appendChild(messageBlock);
});
