'use strict';

const success = (text) => {
  const notification = document.createElement('div');

  notification.classList.add('success');
  notification.dataset.qa = 'notification';
  notification.textContent = text;
  document.body.append(notification);
};

const error = (text) => {
  const notification = document.createElement('div');

  notification.classList.add('warning');
  notification.dataset.qa = 'notification';
  notification.textContent = text;
  document.body.append(notification);
};

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
