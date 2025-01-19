'use strict';

const firstPromise = new Promise(function (resolve, reject) {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise(function (resolve, reject) {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(function (resolve, reject) {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  });
});

function createMessage(type, message) {
  const div = document.createElement('div');

  div.classList.add(type);
  div.classList.add('notification');
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then((message) => createMessage('success', message))
  .catch((error) => createMessage('error', error));

secondPromise
  .then((message) => createMessage('success', message))
  .catch((error) => createMessage('error', error));

thirdPromise
  .then((message) => createMessage('success', message))
  .catch((error) => createMessage('error', error));
