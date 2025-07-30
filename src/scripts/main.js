'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  const handleClick = () => {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleClick);
  };

  document.addEventListener('click', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const preventContextMenu = (e) => e.preventDefault();

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('contextmenu', preventContextMenu);
    }
  };

  document.addEventListener('contextmenu', preventContextMenu);
  document.addEventListener('mousedown', handleMouseDown);
});

const handleSuccess = (message) => {
  const body = document.querySelector('body');
  const notification = document.createElement('div');

  notification.classList.add('success');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  body.append(notification);
};

const handleError = (message) => {
  const body = document.querySelector('body');
  const notification = document.createElement('div');

  notification.classList.add('error');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  body.append(notification);
};

firstPromise.then(handleSuccess).catch(error => handleError(error.message));
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);
