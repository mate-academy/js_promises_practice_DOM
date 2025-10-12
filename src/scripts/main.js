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
  document.addEventListener(
    'click',
    () => {
      resolve('First promise was resolved');

      clearTimeout(idTimeout);
    },
    { once: true },
  );

  const idTimeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

let rightButton = false;

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');

        if (e.button === 2) {
          rightButton = true;
        }
      }
    },
    { once: true },
  );
});

const thirdPromise = Promise.all([firstPromise, secondPromise]);

async function firstMessage() {
  try {
    const resolve = await firstPromise;

    body.append(createMessageBlock('success', resolve));
  } catch (errorMessage) {
    body.append(createMessageBlock('error', 'First promise was rejected'));
  }
}

async function secondMessage() {
  try {
    const resolve = await secondPromise;

    body.append(createMessageBlock('success', resolve));
  } catch (errorMessage) {
    body.append(createMessageBlock('error', errorMessage));
  }
}

async function thirdMessage() {
  thirdPromise
    .then(() => {
      if (rightButton) {
        body.append(
          createMessageBlock('success', 'Third promise was resolved'),
        );
      }
    })
    .catch((errorMessage) => {
      createMessageBlock('error', errorMessage);
    });
}
firstMessage();
secondMessage();
thirdMessage();
