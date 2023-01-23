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
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
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
  Promise.all([leftClick, rightClick]).then(() => {
    resolve(`Third promise was resolved`);
  });
});

const handler = (message, className = 'success') => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  notification.classList.add(className);

  document.body.append(notification);
};

firstPromise.then(handler).catch((error) => {
  handler(error.message, 'warning');
});
secondPromise.then(handler).catch(handler);
thirdPromise.then(handler).catch(handler);
