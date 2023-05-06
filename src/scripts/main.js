'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve(`First promise was resolved`);
    };
  });

  setTimeout(() => {
    reject(Error(`First promise was rejected`));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    };
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    };

    if (e.button === 2) {
      rightClicked = true;
    };

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

const success = (message) => {
  messageHandler('success', message);
};

const error = (message) => {
  messageHandler('warning', message);
};

function messageHandler(messageType, messageText) {
  document.body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="${messageType}">${messageText}</div>`
  );
};

firstPromise
  .then(success)
  .catch(error);

secondPromise
  .then(success);

thirdPromise
  .then(success);
