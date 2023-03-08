'use strict';

const firstResolveMessage = 'First promise was resolved';
const secondResolveMessage = 'Second promise was resolved';
const thirdResolveMessage = 'Third promise was resolved';
const rejectMessage = 'First promise was rejected';

function createElement(message, className) {
  const notification = document.createElement('div');

  notification.classList.add(className);
  notification.dataset.qa = 'notification';
  notification.textContent = message;
  document.body.append(notification);
}

function successHandler(text) {
  createElement(text, 'success');
}

function errorHandler(text) {
  createElement(text, 'warning');
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(firstResolveMessage);
  });

  setTimeout(() => reject(new Error(rejectMessage)), 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve(secondResolveMessage);
  });

  document.addEventListener('contextmenu', () => {
    resolve(secondResolveMessage);
  });
});

const leftClick = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClick = new Promise(resolve =>
  document.addEventListener('contextmenu', () => {
    resolve();
  }));

const thirdPromise = new Promise(resolve => {
  Promise.all([leftClick, rightClick]).then(() => {
    resolve(thirdResolveMessage);
  });
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
