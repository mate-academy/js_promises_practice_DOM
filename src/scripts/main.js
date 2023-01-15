'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('contextmenu', () => {
    resolve(`Second promise was resolved`);
  });
});

const leftClick = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });
});
const rightClick = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  Promise.all([rightClick, leftClick]).then(() => {
    resolve(`Third promise was resolved`);
  });
});

const handler = (message, className = 'success') => {
  const notificationElement = document.createElement('div');

  notificationElement.setAttribute('data-qa', 'notification');
  notificationElement.textContent = message;
  notificationElement.classList.add(className);

  document.body.append(notificationElement);
};

firstPromise.then(handler).catch((error) => {
  handler(error.message, 'warning');
});
secondPromise.then(handler).catch(handler);
thirdPromise.then(handler).catch(handler);
