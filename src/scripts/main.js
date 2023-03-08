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

function successHandler(message) {
  createElement(message, 'success');
}

function errorHandler(message) {
  createElement(message, 'success');
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

const thirdPromise = new Promise((resolve) => {
  let leftClickCount = 0;
  let rightClickCount = 0;

  document.querySelector('body')
    .addEventListener('mousedown', (eventFunc) => {
      leftClickCount += eventFunc.button === 0 ? 1 : 0;
      rightClickCount += eventFunc.button === 2 ? 1 : 0;

      if (leftClickCount >= 1 && rightClickCount >= 1) {
        resolve(thirdResolveMessage);
      }
    });
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
