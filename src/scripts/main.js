'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.documentElement.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 1 || e.button === 2) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(onSuccess)
  .catch(onError);

const secondPromise = new Promise((resolve, reject) => {
  document.documentElement.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then(onSuccess);

const thirdPromise = new Promise((resolve) => {
  let leftButtonClick = false;
  let rightButtonClick = false;

  document.documentElement.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButtonClick = true;

      if (rightButtonClick) {
        resolve('Third promise was resolved');
      }
    }
  });

  document.documentElement.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      rightButtonClick = true;

      if (leftButtonClick) {
        resolve('Third promise was resolved');
      }
    }
  });
});

thirdPromise
  .then(onSuccess)
  .catch(onError);

function onSuccess(text) {
  const message = document.createElement('div');

  message.classList.add('success');
  message.dataset.qa = 'notification';
  message.textContent = text;
  document.body.append(message);
}

function onError(text) {
  const message = document.createElement('div');

  message.classList.add('warning');
  message.dataset.qa = 'notification';
  message.textContent = text.message;
  document.body.append(message);
}
