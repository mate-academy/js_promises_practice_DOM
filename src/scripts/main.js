'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const body = document.querySelector('body');

  body.addEventListener('click', (e) => {
    resolve();
  });

  setTimeout(() => {
    reject(Error);
  }, 3000);
});

firstPromise
  .then(() => {
    const body = document.querySelector('body');
    const messageBlock = document.createElement('div');

    messageBlock.dataset.qa = 'notification';
    messageBlock.textContent = 'First promise was resolved';
    messageBlock.classList.add('success');
    body.appendChild(messageBlock);
  })
  .catch(() => {
    const body = document.querySelector('body');
    const messageBlock = document.createElement('div');

    messageBlock.dataset.qa = 'notification';
    messageBlock.textContent = 'First promise was rejected';
    messageBlock.classList.add('error');
    body.appendChild(messageBlock);
  });

// =====================================================================
const secondPromise = new Promise((resolve, reject) => {
  const body = document.querySelector('body');

  body.addEventListener('click', (e) => {
    resolve();
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

secondPromise.then(() => {
  const body = document.querySelector('body');
  const messageBlock = document.createElement('div');

  messageBlock.dataset.qa = 'notification';
  messageBlock.textContent = 'Second promise was resolved';
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
      resolve();
    }
  });
});

thirdPromise.then(() => {
  const body = document.querySelector('body');
  const messageBlock = document.createElement('div');

  messageBlock.dataset.qa = 'notification';
  messageBlock.textContent = 'Third promise was resolved';
  messageBlock.classList.add('success');
  body.appendChild(messageBlock);
});
