'use strict';

const notificationContainer = document.createElement('div');

document.body.appendChild(notificationContainer);

const createNotification = (message, isError = false) => {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = isError ? 'error' : 'success';
  notification.textContent = message;
  notificationContainer.appendChild(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve('First promise was resolved');
    document.removeEventListener('click', handleClick);
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', handleClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = () => {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleClick);
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkBothClicks = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
    }
  };

  const handleLeftClick = () => {
    leftClicked = true;
    checkBothClicks();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    rightClicked = true;
    checkBothClicks();
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

const handleSuccess = (message) => {
  createNotification(message);
};

const handleError = (error) => {
  createNotification(error.message, true);
};

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);
