'use strict';

function newMessage(type, text) {
  const message = document.createElement('div');

  message.classList.add(type);
  message.setAttribute('data-qa', 'notification');
  message.textContent = text;
  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise
  .then(result => newMessage('success', result))
  .catch(result => newMessage('warning', result));

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
  .then(result => newMessage('success', result));

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rigthClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rigthClick = true;

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(result => newMessage('success', result));
