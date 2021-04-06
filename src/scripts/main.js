'use strict';

const doc = document;

function createMessage(className, text) {
  const message = document.createElement('span');

  message.className = className;
  message.setAttribute('data-qa', 'notification');
  message.innerText = text;

  doc.append(message);
};

const firstPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', (clickEvent) => {
    const { button } = clickEvent;

    if (button === 0 || button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let isLeftButtonClicked = false;
  let isRightButtonClicked = false;

  document.addEventListener('mousedown', (clickEvent) => {
    const { button } = clickEvent;

    if (button === 0) {
      isLeftButtonClicked = !isLeftButtonClicked;
    }

    if (button === 2) {
      isRightButtonClicked = !isRightButtonClicked;
    }

    if (isRightButtonClicked && isLeftButtonClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((text) => {
    createMessage(text, 'success');
  })
  .catch(() => {
    createMessage('First promise was rejected', 'warning');
  });

secondPromise.then((text) => {
  createMessage(text, 'success');
});

thirdPromise.then((text) => {
  createMessage('First promise was resolved', 'success');
});
