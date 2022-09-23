'use strict';

const leftClick = new Promise((resolve) => {
  document.addEventListener('mousedown', ({ button }) => {
    if (button === 0) {
      resolve('Left click was resolved');
    }
  });
});

const rightClick = new Promise((resolve) => {
  document.addEventListener('mousedown', ({ button }) => {
    if (button === 2) {
      resolve('Right click was resolved');
    }
  });
});

const middleClick = new Promise((resolve) => {
  document.addEventListener('mousedown', ({ button }) => {
    if (button === 1) {
      resolve('Middle click was resolved');
    }
  });
});

const timeout = new Promise((resolve) => {
  setTimeout(() => (
    resolve('Timeout was resolved')
  ), 3000);
});

const resolver1 = (resolve, reject) => {
  leftClick
    .then(() => (resolve('First promise was resolved')));

  middleClick
    .then(() => resolve('First promise was resolved'));

  rightClick
    .then(() => resolve('First promise was resolved'));

  timeout
    .then(() => (reject('First promise was rejected')));
};

const resolver2 = (resolve) => {
  leftClick
    .then(() => (resolve('Second promise was resolved')));

  rightClick
    .then(() => (resolve('Second promise was resolved')));
};

const resolver3 = (resolve) => {
  leftClick
    .then(() => rightClick)
    .then(() => resolve('Third promise was resolved'));
};

const handleResult = (messageType, message) => {
  const messageBlock = document.createElement('div');

  messageBlock.setAttribute('data-qa', 'notification');
  messageBlock.classList.add('message', messageType);
  document.body.append(messageBlock);
  messageBlock.innerText = message;
};

const firstPromise = new Promise(resolver1);
const secondPromise = new Promise(resolver2);
const thirdPromise = new Promise(resolver3);

firstPromise
  .then((message) => handleResult('success', message))
  .catch((message) => handleResult('warning', message));

secondPromise
  .then((message) => handleResult('success', message))
  .catch((message) => handleResult('warning', message));

thirdPromise
  .then((message) => handleResult('success', message))
  .catch((message) => handleResult('warning', message));
