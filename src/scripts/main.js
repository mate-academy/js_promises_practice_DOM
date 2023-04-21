'use strict';

const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise
  .then((message) => {
    addMessage('success', message);
  })
  .catch((error) => {
    addMessage('success', error);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.addEventListener('mousedown', (e) => {
    if (e.button === 1) {
      return;
    }

    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((message) => {
    addMessage('success', message);
  });

const thirdPromise = new Promise((resolve) => {
  let clickLeft = false;
  let clickRight = false;

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clickLeft = true;
    }

    if (e.button === 2) {
      clickRight = true;
    }

    if (clickLeft && clickRight) {
      resolve('Third promise was resolved');
    };
  });
});

thirdPromise
  .then((message) => {
    addMessage('success', message);
  });

function addMessage(className, textMessage) {
  return logo.insertAdjacentHTML('afterend',
    `<div data-qa="notification" class="${className}">${textMessage}</div>`);
};
