'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let rightBth = false;
let leftBth = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      rightBth = true;
    } else if (e.button === 0) {
      leftBth = true;
    }

    if (leftBth && rightBth) {
      resolve('Third promise was resolved');
    }
  });
});

const appendMessage = (message, className) => {
  const div = document.createElement('div');

  div.classList.add(className);
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.appendChild(div);
};

const successHandler = (message) => {
  appendMessage(message, 'success');
};

const errorHandler = (error) => {
  appendMessage(error.message, 'error');
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
