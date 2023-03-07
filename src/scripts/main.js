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

function success(text) {
  createElement(text, 'success');
}

function error(text) {
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

const thirdPromise = new Promise(resolve => {
  // eslint-disable-next-line no-shadow
  const leftClick = new Promise(resolve => {
    document.addEventListener('click', () => {
      resolve();
    });
  });

  // eslint-disable-next-line no-shadow
  const rightClick = new Promise(resolve => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  });

  Promise.all([leftClick, rightClick]).then(() => {
    resolve(thirdResolveMessage);
  });
});

firstPromise.then(success).catch(error);
secondPromise.then(success);
thirdPromise.then(success);
