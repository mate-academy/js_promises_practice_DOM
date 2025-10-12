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
  body.addEventListener('mousedown', (e) => {
    const buttonClick = e.button;

    if (buttonClick === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
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
    const resolve = await secondPromise;

    body.append(createMessageBlock('success', resolve));
  }
}

async function thirdMessage() {
  if (body) {
    thirdPromise.then(() => {
      body.append(createMessageBlock('success', 'Third promise was resolved'));
    });
  }
}
firstMessage();
secondMessage();
thirdMessage();
