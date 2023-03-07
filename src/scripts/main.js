'use strict';

const firstPromiseResolvedMessage = 'First promise was resolved';
const secondPromiseResolvedMessage = 'Second promise was resolved';
const thirdPromiseResolvedMessage = 'Third promise was resolved';
const firstPromiseRejectMessage = 'First promise was rejected';

function createElement(message, className) {
  const divElement = document.createElement('div');

  divElement.dataset.qa = 'notification';
  divElement.classList.add(className);
  divElement.textContent = message;
  document.body.append(divElement);
}

function firstSuccess() {
  createElement(firstPromiseResolvedMessage, 'success');
}

function secondSuccess() {
  createElement(secondPromiseResolvedMessage, 'success');
}

function thirdSuccess() {
  createElement(thirdPromiseResolvedMessage, 'success');
}

function firstError() {
  createElement(firstPromiseRejectMessage, 'warning');
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(firstPromiseResolvedMessage);
  });

  setTimeout(() => reject(new Error(firstPromiseRejectMessage)), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve(secondPromiseResolvedMessage);
  });

  document.addEventListener('contextmenu', () => {
    resolve(secondPromiseResolvedMessage);
  });
});

const leftClick = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClick = new Promise(resolve => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});
const thirdPromise = new Promise(resolve => {
  Promise.all([leftClick, rightClick]).then(() => {
    resolve(thirdPromiseResolvedMessage);
  });
});

firstPromise.then(firstSuccess, firstError);
secondPromise.then(secondSuccess);
thirdPromise.then(thirdSuccess);
