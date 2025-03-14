'use strict';

function createMessage(type, message) {
  const notification = document.createElement('div');

  notification.textContent = message;

  notification.classList.add(type);
  notification.dataset.qa = 'notification';

  return notification;
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutID = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeoutID);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => successHandler(message))
  .catch((error) => errorHandler(error.message));

secondPromise.then((message) => successHandler(message));

thirdPromise.then((message) => successHandler(message));

function successHandler(message) {
  const successMessage = createMessage('success', message);

  document.body.append(successMessage);
}

function errorHandler(message) {
  const errorMessage = createMessage('error', message);

  document.body.append(errorMessage);
}
