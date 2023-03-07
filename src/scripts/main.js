'use strict';

function createElement(message, className) {
  const notification = document.createElement('div');

  notification.classList.add(className);
  notification.dataset.qa = 'notification';
  notification.textContent = message;
  document.body.append(notification);
}

function success(text) {
  createElement(text, 'success');
}

function error(text) {
  createElement(text, 'warning');
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
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
    resolve('Third promise was resolved');
  });
});

firstPromise.then(success).catch(error);

secondPromise.then(success);

thirdPromise.then(success);
