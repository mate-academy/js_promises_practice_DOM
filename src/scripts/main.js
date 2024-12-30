'use strict';

const createNotification = (message, isSuccess) => {
  const notification = document.createElement('div');

  notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
  notification.dataset.qa = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  const handleLeftClick = (e) => {
    resolve('First promise was resolved');
    document.removeEventListener('click', handleLeftClick);
  };

  document.addEventListener('click', handleLeftClick);

  setTimeout(() => {
    reject(new Error());
    document.removeEventListener('click', handleLeftClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const handleBothClicks = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handleBothClicks);
    }
  };

  document.addEventListener('mousedown', handleBothClicks);
});

firstPromise
  .then((message) => createNotification(message, true))
  .catch((message) => createNotification(message, false));
secondPromise.then((message) => createNotification(message, true));
thirdPromise.then((message) => createNotification(message, true));

document.addEventListener('contextmenu', (e) => e.preventDefault());
