'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeft = false;
  let isRight = false;

  document.addEventListener('click', (e) => {
    isLeft = true;

    if (isLeft && isRight) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    isRight = true;

    if (isLeft && isRight) {
      e.preventDefault();
      resolve('Third promise was resolved');
    }
  });
});

function promiseHandler(text, isSuccess) {
  const messageElement = document.createElement('div');
  const textElement = document.createElement('p');
  const className = isSuccess ? 'success' : 'error';

  messageElement.setAttribute('data-qa', 'notification');
  messageElement.classList.add(className);
  textElement.textContent = text;
  messageElement.appendChild(textElement);
  body.append(messageElement);
}

firstPromise.then((resolve) => promiseHandler(resolve, true));
firstPromise.catch((error) => promiseHandler(error, false));

secondPromise.then((resolve) => promiseHandler(resolve, true));

thirdPromise.then((resolve) => promiseHandler(resolve, true));
