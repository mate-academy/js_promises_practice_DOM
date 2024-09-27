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
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      leftClick = true;
    } else if (mouseEvent.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function handleSuccess(message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = 'success';
  notification.textContent = message;
  document.body.append(notification);
}

function handleError(message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = 'error';
  notification.textContent = message;
  document.body.append(notification);
}

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess).catch(handleError);
thirdPromise.then(handleSuccess).catch(handleError);
