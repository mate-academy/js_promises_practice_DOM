/* eslint-disable no-shadow */
'use strict';

function createNotification(text, state) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add(state);
  message.textContent = text;
  document.body.appendChild(message);
}

let rightClick = false;
let leftClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    leftClick = true; // Правильно присвоюємо значення
    resolve();
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', () => {
    rightClick = true;
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  if (!rightClick && !leftClick) {
    document.addEventListener('click', () => {
      leftClick = true;
      resolve();
    });

    document.addEventListener('contextmenu', () => {
      rightClick = true;
      resolve();
    });
  }
});

firstPromise
  .then(() => {
    createNotification('First promise was resolved', 'success');
  })
  .catch((error) => {
    createNotification(error.message, 'error');
  });

secondPromise.then(() => {
  createNotification('Third promise was resolved', 'success');
});

thirdPromise.then(() => {
  createNotification('Second promise was resolved', 'success');
});
