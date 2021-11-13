'use strict';

function returnPromise(typeOfMessage, messageText) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add(typeOfMessage);
  message.textContent = messageText;
  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });
  setTimeout(reject, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', event => {
    if (event.button === 0 || event.button === 2) {
      resolve();
    }
  });
});

function createPromise(numberOfButton) {
  return new Promise(resolve => {
    document.addEventListener('mousedown', event => {
      if (event.button === numberOfButton) {
        resolve();
      }
    });
  });
}

const thirdPromise = createPromise(0);
const thirdPromise1 = createPromise(2);

firstPromise
  .then(() => {
    returnPromise('success',
      'First promise was resolved');
  })
  .catch(() => {
    returnPromise('warning',
      'First promise was rejected');
  });

secondPromise
  .then(() => {
    returnPromise('success',
      'Second promise was resolved');
  });

Promise.all([thirdPromise, thirdPromise1]).then(() => {
  returnPromise('success',
    'Third promise was resolved');
});
