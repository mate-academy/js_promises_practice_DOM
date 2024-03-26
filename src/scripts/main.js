'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0 || mouseEvent.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      leftClicked = true;
    } else if (mouseEvent.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = (message) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = 'success';
  notification.textContent = message;
  document.body.appendChild(notification);
};

const errorHandler = (error) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = 'error';
  notification.textContent = error.message;
  document.body.appendChild(notification);
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
