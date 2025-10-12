'use strict';

const body = document.querySelector('body');

function createMessageBlock(className, text) {
  const messageBlock = document.createElement('div');

  messageBlock.setAttribute('data-qa', 'notification');

  messageBlock.classList.add(`${className}`);

  messageBlock.textContent = text;

  return messageBlock;
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener(
    'mousedown',
    (e) => {
      const buttonClick = e.button;

      if (buttonClick === 0) {
        resolve('First promise was resolved');

        clearTimeout(idTimeout);
      }
    },
    { once: true },
  );

  const idTimeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const thirdPromise = Promise.all([firstPromise, secondPromise]);

async function firstMessage() {
  if (body) {
    try {
      const resolve = await firstPromise;

      body.append(createMessageBlock('success', resolve));
    } catch (errorMessage) {
      body.append(createMessageBlock('error', 'First promise was rejected'));
    }
  }
}

async function secondMessage() {
  if (body) {
    try {
      const resolve = await secondPromise;

      body.append(createMessageBlock('success', resolve));
    } catch (errorMessage) {
      body.append(createMessageBlock('error', errorMessage));
    }
  }
}

async function thirdMessage() {
  if (body) {
    thirdPromise
      .then(() => {
        body.append(
          createMessageBlock('success', 'Third promise was resolved'),
        );
      })
      .catch((errorMessage) => {
        createMessageBlock('error', errorMessage);
      });
  }
}
firstMessage();
secondMessage();
thirdMessage();
