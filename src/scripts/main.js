'use strict';

let leftButtonDown = false;
let rightButtonDown = false;

const firstPromise = new Promise((resolve, reject) => {
  function firstPromiseHandler() {
    resolve(`First promise was resolved`);
  }

  document.addEventListener('click', firstPromiseHandler);

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
    document.removeEventListener('click', firstPromiseHandler);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const secondPromiseHandler = (eSecond) => {
    if (eSecond.button === 0 || eSecond.button === 2) {
      resolve(`Second promise was resolved`);
    }
  };

  document.addEventListener('mouseup', (eSecond) => {
    secondPromiseHandler(eSecond);
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', (eDown) => {
    if (eDown.button === 0) {
      leftButtonDown = true;
    }

    if (eDown.button === 2) {
      rightButtonDown = true;
    }

    if (leftButtonDown && rightButtonDown) {
      resolve(`Third promise was resolved`);
    }
  });

  document.addEventListener('mouseup', (eUp) => {
    if (eUp.button === 0) {
      leftButtonDown = false;
    }

    if (eUp.button === 2) {
      rightButtonDown = false;
    }
  });
});

const messenger = (message, type) => {
  const div = document.createElement('div');

  div.textContent = message;
  div.className = type;
  div.setAttribute('data-qa', 'notification');
  document.body.append(div);
};

firstPromise.then(
  (payload) => messenger(payload, 'success'),
  (error) => messenger(error.message, 'error'),
);

secondPromise.then((payload) => messenger(payload, 'success'));

thirdPromise.then((payload) => messenger(payload, 'success'));
