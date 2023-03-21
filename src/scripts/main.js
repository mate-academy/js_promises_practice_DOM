'use strict';

function createMessage(type, text) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add(type);
  message.innerText = text;
  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error(' First promise was rejected')), 3000);
});

firstPromise
  .then((result) => createMessage('success', result))
  .catch((result) => createMessage('warning', result));

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((result) => createMessage('success', result));

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rigthClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick & rigthClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rigthClick = true;

    if (leftClick & rigthClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((result) => createMessage('success', result));
