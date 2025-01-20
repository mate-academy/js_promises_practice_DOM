'use strict';

const logo = document.querySelector('.logo');
const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('F'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  let isResolved = false;

  const handleResolve = () => {
    if (!isResolved) {
      isResolved = true;
      resolve();
    }
  };

  document.addEventListener('click', handleResolve);
  document.addEventListener('contextmenu', handleResolve);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;
  let isResolved = false;

  const handleLeftClick = () => {
    leftClick = true;
    checkBothClicks();
  };

  const handleRightClick = () => {
    rightClick = true;
    checkBothClicks();
  };

  const checkBothClicks = () => {
    if (leftClick && rightClick && !isResolved) {
      isResolved = true;
      resolve();

      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
    }
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

firstPromise
  .then(() => {
    showMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    showMessage('error', 'First promise was rejected');
  });

secondPromise.then(() => {
  showMessage('success', 'Second promise was resolved');
});

thirdPromise.then(() => {
  showMessage('success', 'Third promise was resolved');
});

function showMessage(type, message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList = type;
  notification.innerText = message;

  body.appendChild(notification);
}
