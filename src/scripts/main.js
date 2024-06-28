'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  const bothTrue = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  body.addEventListener('click', () => {
    leftClick = true;
    bothTrue();
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    bothTrue();
  });
});

function result(message, error) {
  const resultMessage = document.createElement('div');

  resultMessage.dataset.qa = 'notification';

  if (message) {
    resultMessage.classList.add('success');
    resultMessage.textContent = message;
  } else {
    resultMessage.classList.add('error');
    resultMessage.textContent = error.message;
  }
  body.appendChild(resultMessage);
}

firstPromise
  .then((message) => result(message))
  .catch((error) => result(null, error));

secondPromise
  .then((message) => result(message))
  .catch((error) => result(null, error));

thirdPromise
  .then((message) => result(message))
  .catch((error) => result(null, error));
