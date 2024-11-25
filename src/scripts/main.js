'use strict';

function appendMessage(text, isError = false) {
  const div = document.createElement('div');

  div.className = isError ? 'notification error' : 'notification success';
  div.dataset.qa = 'notification';
  div.textContent = text;
  document.body.append(div);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });
  // eslint-disable-next-line prefer-promise-reject-errors
  setTimeout(() => reject('First promise was rejected'), 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then((message) => {
    appendMessage(message);
  })
  .catch((errorMessage) => {
    appendMessage(errorMessage, true);
  });

promise2
  .then((message) => {
    appendMessage(message);
  })
  .catch((errorMessage) => {
    appendMessage(errorMessage, true);
  });

promise3
  .then((message) => {
    appendMessage(message);
  })
  .catch((errorMessage) => {
    appendMessage(errorMessage, true);
  });
